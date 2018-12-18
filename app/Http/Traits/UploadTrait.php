<?php

namespace App\Http\Traits;

use App\{
    File, Jobs\Emailer, Mail\FileUploaded, Setting, Upload, ShortUrl, Receiver, UploadLog, BannedMessage, Helpers\EmailHelper as Email
};
use Jenssegers\Agent\Agent;
use Illuminate\Http\Request;
use App\Helpers\StorageHelper;

trait UploadTrait
{
    /**
     * Upload completed
     *
     * @param $data
     * @param $request
     * @return array
     */
    public function uploadComplete($data, $request)
    {
        $total_files = $count = $data['zip'];
        $max_file_size = $data['settings']['max_size'] * 1048576;
        $password = $data['password'] ? md5($data['password']) : 'EMPTY';

        $response_array = [];
        $response_array['upload_id'] = $data['upload_id'];
        $response_array['upload_fid'] = $data['fid'];
        $response_array['upload_type'] = $data['share'];

        $total_size = $data['qqtotalfilesize'];
        if ($total_size < 0) {
            $total_size = $total_size + (4 * 1024 * 1024 * 1024);
        }

        //Insert record in uploads table
        $upload = Upload::firstOrCreate([
            'upload_id' => $data['upload_id']
        ],[
            'upload_id' => $data['upload_id'],
            'email_from' => $data['email_from'] ?? '',
            'message' => $data['message'] ?? '',
            'secret_code' => md5(time() . rand()),
            'password' => $password,
            'status' => 'processing',
            'size' => $total_size,
            'time' => time(),
            'ip' => request()->ip(),
            'count' => $total_files,
            'share' => $data['share'],
            'destruct' => strtoupper($data['destruct']),
            'upload_lang' => $data['upload_lang'],
            'upload_server' => $data['upload_server'],
            'u_type' => $data['u_type'],
            'fid' => $data['fid'],
            'time_expire' => $data['time_expire'],
            'lang' => $data['upload_lang']
        ]);

        //check if total files count is greater
        // than max uploadable limit
        if (
            $total_files == $data['settings']['max_files']
            || $total_files < $data['settings']['max_files']
            || $data['settings']['max_files'] == ''
        ) {
            if ($total_size < $max_file_size) {

                if ($data['share'] == 'mail') {

                    $upload_hash = md5(time() . rand());
                    $long_url = $data['our_site_url'] . $data['upload_id'];
                    $short_url = $data['our_short_url'] . $data['upload_id'];

                    //Insert record in short url table
                    ShortUrl::create([
                        'fid' => $short_url,
                        'link' => $long_url,
                        'type' => $data['share'],
                        'uploadid' => $data['upload_id'],
                        'privateid' => 0,
                        'secretkey' => $upload_hash,
                        'destroyed' => time()
                    ]);

                    $response_array['ShortUrlFid'] = $short_url;

                    $upload->update([
                        'status' => 'ready',
                        'time_expire' => time() + $data['settings']['expire']
                    ]);

                    $log = UploadLog::updateOrCreate(
                        [ 'uploadid' => $data['upload_id'] ],
                        array_merge($data, [
                            'status' => 'uploaded',
                            'time'  => time(),
                            'timeend' => time(),
                            'timemoving' => time(),
                            'count' => $total_files,
                            'size' => $total_size
                        ])
                    );

                    foreach ($request->email_to as $receiver) {
                        $private_id = substr(
                            str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 15
                        );

                        Receiver::create([
                            'upload_id' => $data['id'],
                            'private_id' => $private_id,
                            'email' => $receiver
                        ]);

                        // Check spam
                        if ($data['message'] && $this->isSPAM($data['message'])) {
                            // if spam set status as SPAM
                            $log->update([
                                'status' => 'SPAM',
                                'timemoving' => time()
                            ]);
                            $upload->update([ 'status' => 'SPAM' ]);
                        }
                    }

                    $email_from = $request->email_from;
                    $expire_time = $data['time_expire'];
                    $size = "size";
                    $file_names = 'file_names';
                    $message = $request->message != '' ? $request->message : 'no message';
                    $upload_id = $request->id;
                    $receivers = implode(', ', $request->email_to);
                    $total_files = (string) $total_files;

                    $email_data = compact( 'receivers', 'email_from', 'size', 'expire_time',
                        'file_names', 'total_files', 'message', 'upload_id' );

                    // Send emails to receivers
                    Email::sendQueue(
                        new FileUploaded( 'File received', $email_data, 'emails.fileReceived'),
                        $request->email_to
                    );
                    //Send email to sender;
                    Email::sendQueue(
                        new FileUploaded( 'File Uploaded', $email_data, 'emails.fileUploaded'),
                        [$request->email_from]
                    );
                } else {
                    $upload->update([
                        'status' => 'ready',
                        'time_expire' => time() + $data['settings']['expire']
                    ]);
                    UploadLog::updateOrCreate(
                        [ 'uploadid' => $data['upload_id'] ],
                        array_merge($data, [
                            'status' => 'uploaded',
                            'time'  => time(),
                            'timeend' => time(),
                            'count' => $total_files,
                            'size' => $total_size,
                            'timemoving' => time()
                        ])
                    );
                }

                $response_array['FileUploadedOk'] = 'true';
                $response_array['success'] = 'true';
            }
        } else {
            $response_array['max_files'] = 'true';
        }

        return $response_array;
    }

    /**
     * Handle file uploads
     *
     * @param $data
     * @param Request $request
     * @return array
     */
    public function uploadNotZipped($data, Request $request)
    {

        $hash = $data['id'];
        $n = $this->getName( $request );
        $name = "$hash-$n";
        $uuid = $request->qquuid;

        // If all the uploads has been done
        // combine all the chunks
        if ( $request->has('done') ) {

            $targetFolder = storage_path('app'). DIRECTORY_SEPARATOR .'chunks'. DIRECTORY_SEPARATOR
                                . date('Y'). DIRECTORY_SEPARATOR . date('m') . DIRECTORY_SEPARATOR . $uuid;
            $totalParts = (int) $request->qqtotalparts ?? 1;

            $targetPath = storage_path('app'). DIRECTORY_SEPARATOR .'uploads'. DIRECTORY_SEPARATOR
                                . date('Y').DIRECTORY_SEPARATOR .date('m') .DIRECTORY_SEPARATOR . $name;

            // Create a file in given location and give permissions
            if (!file_exists(dirname($targetPath))) {
                mkdir(dirname($targetPath), 0777, true);
            }

            // Open the file
            $target = fopen($targetPath, 'wb');

            // Read and join chunks in given file
            for ($i = 0; $i < $totalParts; $i++) {
                $chunk = fopen($targetFolder . DIRECTORY_SEPARATOR . $i, "rb");
                stream_copy_to_stream($chunk, $target);
                fclose($chunk);
            }

            // Success joining chunks,
            // close created file
            fclose($target);

            // Remove merged chunks
            for ($i = 0; $i < $totalParts; $i++) {
                unlink($targetFolder . DIRECTORY_SEPARATOR . $i);
            }

            rmdir($targetFolder);

            $result = [
                "success" => true,
                "uuid" => $uuid
            ];

        } else {

            // TODO Not sure why author needed to do this
            // TODO when there may be useful and unmerged chunks :/
            //if (1 == mt_rand(1, 1 / 0.001)) {
            //     Run garbage collection
            //}

            $type = $request->header("CONTENT_TYPE");

            if (!isset($type)) {
                return [
                    'error' => "No files were uploaded."
                ];
            } else if (strpos(strtolower($type), 'multipart/') !== 0) {
                return [
                    'error' => "Not a multipart request."
                ];
            }

            // Get size and name
            $file = $request->file('qqfile');
            $size = $file->getSize();
            if ($request->has('qqtotalfilesize')) {
                $size = $request->qqtotalfilesize;
            }

            // Perform validation
            if( $this->validation($name, $size)->get('fails') ){
                return $this->validation($name, $size)->get('errors');
            }

            // Save a chunk
            $totalParts = (int) $request->qqtotalparts ?? 1;

            if ($totalParts > 1) {

                $partIndex = (int) $request->qqpartindex;

                $target = $uuid . DIRECTORY_SEPARATOR . $partIndex;

                $savedFile = StorageHelper::saveFile('chunks', $file, $target);

            } else {

                $savedFile = StorageHelper::saveFile('uploads', $file, $name);
            }

            $result =  [
                "success" => true,
                "uuid" => $uuid,
                "uploadName" => $savedFile
            ];
        }

        // Check if its done or the upload name is set
        if (isset($data['done']) || !empty($result["uploadName"])) {
            $name = str_replace("'", "`", $this->getName( $request ));
            $location = date('Y').DIRECTORY_SEPARATOR .date('m') .DIRECTORY_SEPARATOR . $hash.'-'.$name;
            File::firstOrCreate(
                [
                    'upload_id' => $data['upload_id'],
                    'secret_code' => $hash,
                    'file' => $name,
                    'location' => $location
                ]
            );
        }

        return json_encode($result);
    }


    /**
     * Validate name and size
     *
     * @param $name
     * @param $size
     * @return \Illuminate\Support\Collection
     */
    public function validation($name, $size){
        $errors = [];
        // Validate name
        if ($name === null || $name === '') {
            $errors = [
                'error' => 'File name empty.'
            ];
        }

        // Validate file size
        if ($size == 0) {
            $errors = [
                'error' => 'File is empty.'
            ];
        }

        $fails = count($errors) > 0;

        return collect(compact(
            'fails',
            'errors'
        ));
    }

    /**
     * Get short url
     *
     * @param $count
     * @param string $short_url
     * @return string
     */
    public function getShortUrl($count, $short_url = '')
    {
        $isDuplicate = true;
        while ($isDuplicate) {
            $short_url = ($short_url != '') ? $short_url : $this->getToken($count);
            $isDuplicate = ShortUrl::where('fid', $short_url)->first();
            if (!$isDuplicate) {
                return $short_url;
            }
        }
    }


    /**
     * Get token
     *
     * @param $length
     * @return string
     */
    function getToken($length)
    {
        $token = "";
        $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $codeAlphabet .= "abcdefghijklmnopqrstuvwxyz";
        $codeAlphabet .= "0123456789";
        $max = strlen($codeAlphabet) - 1;
        for ($i = 0; $i < $length; $i++) {
            $token .= $codeAlphabet[$this->crypto_rand_secure(0, $max)];
        }
        return $token;
    }


    /**
     * Create a random int
     *
     * @param $min
     * @param $max
     * @return int
     */
    function crypto_rand_secure($min, $max)
    {
        $range = $max - $min;
        if ($range < 1) return $min; // not so random...
        $log = ceil(log($range, 2));
        $bytes = (int)($log / 8) + 1; // length in bytes
        $bits = (int)$log + 1; // length in bits
        $filter = (int)(1 << $bits) - 1; // set all lower bits to 1
        do {
            $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
            $rnd = $rnd & $filter; // discard irrelevant bits
        } while ($rnd >= $range);
        return $min + $rnd;
    }


    /**
     * Get the original filename
     * @param Request $request
     * @return mixed
     */
    public function getName(Request $request)
    {
        if($request->has('qqfilename'))
            return str_replace("'", "`", $request->qqfilename);

        if ($request->file('qqfile'))
            return str_replace("'", "`", $request->file('qqfile')->getClientOriginalName());
    }

    /**
     * @param $message
     * @return bool
     */
    public function isSPAM($message)
    {
        $record = BannedMessage::where('ban_message', 'LIKE', "%{$message}%")
            ->where('ban_expire', '>', time())
            ->get();
        return isset($record);
    }


    /**
     * Create a short url and an upload log
     *
     * @param Request $request
     * @param array $data
     * @return mixed|string
     */
    public function insertLog(Request $request, $data = []){
        try {
            //Create a short url
            if(!$data){
                $short_url = $this->getShortUrl(11, $request->id);
            }
            $upload_id = $short_url ?? $request->upload_id;

            //Initialize an upload log
            $uploadLog = UploadLog::firstOrCreate([
                'uploadid' => $upload_id
            ], array_merge([
                'upload_id' => $upload_id,
                'status' => 'uploading',
                'time' => time(),
                'timemoving' => '',
                'timezipping' => '',
                'timeend' => '',
                'ip' => $request->ip(),
                'upload_lang' => 'en',
                'size' => $request->size,
                'count' => $request->files->count(),
                'type' => $request->type,
                'utype' => $request->utype,
                'hua' => $request->userAgent()
            ], $data));
            return $short_url ?? "OK";
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return "NOT";
        }
    }

    /**
     * Check if a download is available
     *
     * @param Request $request
     * @return array|\Illuminate\Http\JsonResponse
     */
    public function checkDownload(Request $request){

        //Check for files
        $files = File::where('upload_id', $request->id)
            ->get();
        //Check uplaod details
        $details = Upload::where('upload_id', $request->id)
            ->where('status', '!=', 'destroyed')
            ->get();

        if($details->count() == 0)
            return [];

        //Check if files are password protected
        foreach ($details as $detail){
            if($detail->password !== 'EMPTY')
                $protected = true;
        }

        if(!isset($protected))
            return compact('files', 'details');

        return response()->json([
            'download_id' => $request->id,
            'secret' => $details->first()->secret_code,
            'status' => 403
        ]);
    }

    /**
     * Get user type
     *
     * @param Request $request
     * @return int
     */
    public function getBrowserType(Request $request){
        $user_type = 1;
        $agent = new Agent();
        if( $agent->isMobile() || $agent->isTablet() || $request->mob == 'test'){
            $user_type = 2;
        }

        return $user_type;
    }


    public function reportDownload(Request $request){
        $upload = Upload::where('upload_id', $request->id)->first();
        $max_file_reports = (int) optional(Setting::first())
                                ->max_file_reports;

        if($max_file_reports != 0 && $upload->flag + 1 == $max_file_reports) {
            $upload->update([
                'status' => 'destroyed'
            ]);
            foreach ($upload->files as $file) {
                $filePath = storage_path('app').DIRECTORY_SEPARATOR.'uploads'
                    .DIRECTORY_SEPARATOR.$file->location;
                unlink($filePath);
            }
        } else {
            $flag = (int) $upload->flag + 1;
            $upload->update(
                compact('flag')
            );
        }
        return response()->json(['message' => 'Upload reported']);
    }
}