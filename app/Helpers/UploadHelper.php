<?php

namespace App\Helpers;


use App\BannedMessage;
use App\File;
use App\MysqlLog;
use App\Receiver;
use App\ShortUrl;
use App\Upload;
use App\UploadLog;
use Illuminate\Support\Facades\Storage;

/**
 * Class UploadHelper
 * @package App\Helpers
 */
class UploadHelper
{

    /**
     * @var array
     */
    public $allowedExtensions = array();
    /**
     * @var null
     */
    public $sizeLimit = null;
    /**
     * @var string
     */
    public $inputName = 'qqfile';
    /**
     * @var string
     */
    public $chunksFolder = 'chunks';

    /**
     * @var float
     */
    public $chunksCleanupProbability = 0.001; // Once in 1000 requests on avg
    /**
     * @var int
     */
    public $chunksExpireIn = 345600; // One week

    /**
     * @var
     */
    protected $uploadName;

    /**
     * Get the original filename
     */
    public function getName()
    {
        if (isset($_REQUEST['qqfilename']))
            return str_replace("'", "`", $_REQUEST['qqfilename']);

        if (isset($_FILES[$this->inputName]))
            return str_replace("'", "`", $_FILES[$this->inputName]['name']);
    }

    /**
     * @return array
     */
    public function getInitialFiles()
    {
        $initialFiles = array();

        for ($i = 0; $i < 5000; $i++) {
            array_push($initialFiles, array("name" => "name" + $i, uuid => "uuid" + $i, thumbnailUrl => "/test/dev/handlers/vendor/fineuploader/php-traditional-server/fu.png"));
        }

        return $initialFiles;
    }

    /**
     * Get the name of the uploaded file
     */
    public function getUploadName()
    {
        return $this->uploadName;
    }

    /**
     * @param $uploadDirectory
     * @param null $name
     * @return array
     */
    public function combineChunks($uploadDirectory, $name = null)
    {
        $uuid = $_POST['qquuid'];
        if ($name === null) {
            $name = $this->getName();
        }
        $targetFolder = $this->chunksFolder . DIRECTORY_SEPARATOR . $uuid;
        $totalParts = isset($_REQUEST['qqtotalparts']) ? (int)$_REQUEST['qqtotalparts'] : 1;

        $targetPath = join(DIRECTORY_SEPARATOR, array($uploadDirectory, $name));
        $this->uploadName = $name;

        if (!file_exists(dirname($targetPath))) {
            mkdir(dirname($targetPath), 0777, true);
        }
        $target = fopen($targetPath, 'wb');

        for ($i = 0; $i < $totalParts; $i++) {
            $chunk = fopen($targetFolder . DIRECTORY_SEPARATOR . $i, "rb");
            stream_copy_to_stream($chunk, $target);
            fclose($chunk);
        }

        // Success
        fclose($target);

        for ($i = 0; $i < $totalParts; $i++) {
            unlink($targetFolder . DIRECTORY_SEPARATOR . $i);
        }

        rmdir($targetFolder);

        if (!is_null($this->sizeLimit) && filesize($targetPath) > $this->sizeLimit) {
            unlink($targetPath);
            http_response_code(413);
            return array("success" => false, "uuid" => $uuid, "preventRetry" => true);
        }

        return array("success" => true, "uuid" => $uuid);
    }


    /**
     * @param $uploadDirectory
     * @param null $name
     * @return array
     */
    public function handleUpload($uploadDirectory, $name = null)
    {

        if (is_writable($this->chunksFolder) &&
            1 == mt_rand(1, 1 / $this->chunksCleanupProbability)) {

            // Run garbage collection
            $this->cleanupChunks();
        }

        // Check that the max upload size specified in class configuration does not
        // exceed size allowed by server config
        if ($this->toBytes(ini_get('post_max_size')) < $this->sizeLimit ||
            $this->toBytes(ini_get('upload_max_filesize')) < $this->sizeLimit) {
            $neededRequestSize = max(1, $this->sizeLimit / 1024 / 1024) . 'M';
            return array('error' => "Server error. Increase post_max_size and upload_max_filesize to " . $neededRequestSize);
        }

        if ($this->isInaccessible($uploadDirectory)) {
            return array('error' => "Server error. Uploads directory isn't writable");
        }

        $type = $_SERVER['CONTENT_TYPE'];
        if (isset($_SERVER['HTTP_CONTENT_TYPE'])) {
            $type = $_SERVER['HTTP_CONTENT_TYPE'];
        }

        if (!isset($type)) {
            return array('error' => "No files were uploaded.");
        } else if (strpos(strtolower($type), 'multipart/') !== 0) {
            return array('error' => "Server error. Not a multipart request. Please set forceMultipart to default value (true).");
        }

        // Get size and name
        $file = $_FILES[$this->inputName];
        $size = $file['size'];
        if (isset($_REQUEST['qqtotalfilesize'])) {
            $size = $_REQUEST['qqtotalfilesize'];
        }

        if ($name === null) {
            $name = $this->getName();
        }


        // Validate name
        if ($name === null || $name === '') {
            return array('error' => 'File name empty.');
        }

        // Validate file size
        if ($size == 0) {
            return array('error' => 'File is empty.');
        }

        if (!is_null($this->sizeLimit) && $size > $this->sizeLimit) {
            return array('error' => 'File is too large.', 'preventRetry' => true);
        }

        // Validate file extension
        $pathinfo = pathinfo($name);
        $ext = isset($pathinfo['extension']) ? $pathinfo['extension'] : '';

        if ($this->allowedExtensions && !in_array(strtolower($ext), array_map("strtolower", $this->allowedExtensions))) {
            $these = implode(', ', $this->allowedExtensions);
            return array('error' => 'File has an invalid extension, it should be one of ' . $these . '.');
        }

        // Save a chunk
        $totalParts = isset($_REQUEST['qqtotalparts']) ? (int)$_REQUEST['qqtotalparts'] : 1;

        $uuid = $_REQUEST['qquuid'];
        if ($totalParts > 1) {
            // chunked upload
            $chunksFolder = $this->chunksFolder;
            $partIndex = (int)$_REQUEST['qqpartindex'];

            if (!is_writable($chunksFolder) && !is_executable($uploadDirectory)) {
                return array('error' => "Server error. Chunks directory isn't writable or executable.");
            }

            $targetFolder = $this->chunksFolder . DIRECTORY_SEPARATOR . $uuid;

            if (!file_exists($targetFolder)) {
                mkdir($targetFolder, 0777, true);
            }

            $target = $targetFolder . '/' . $partIndex;
            $success = move_uploaded_file($_FILES[$this->inputName]['tmp_name'], $target);

            return array("success" => true, "uuid" => $uuid);

        } else {
            // non-chunked upload

            $target = join(DIRECTORY_SEPARATOR, array($uploadDirectory, $name));

            if ($target) {
                $this->uploadName = basename($target);

                if (!is_dir(dirname($target))) {
                    mkdir(dirname($target), 0777, true);
                }
                if (move_uploaded_file($file['tmp_name'], $target)) {
                    return array('success' => true, "uuid" => $uuid);
                }
            }

            return array('error' => 'Could not save uploaded file.' .
                'The upload was cancelled, or server error encountered');
        }
    }

    /**
     * @param $uploadDirectory
     * @param null $name
     * @return array
     */
    public function handleDelete($uploadDirectory, $name = null)
    {
        if ($this->isInaccessible($uploadDirectory)) {
            return array('error' => "Server error. Uploads directory isn't writable" . ((!$this->isWindows()) ? " or executable." : "."));
        }

        $targetFolder = $uploadDirectory;
        $uuid = false;
        $method = $_SERVER["REQUEST_METHOD"];
        if ($method == "DELETE") {
            $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            $tokens = explode('/', $url);
            $uuid = $tokens[sizeof($tokens) - 1];
        } else if ($method == "POST") {
            $uuid = $_REQUEST['qquuid'];
        } else {
            return array("success" => false,
                "error" => "Invalid request method! " . $method
            );
        }

        $target = join(DIRECTORY_SEPARATOR, array($targetFolder, $uuid));

        if (is_dir($target)) {
            $this->removeDir($target);
            return array("success" => true, "uuid" => $uuid);
        } else {
            return array("success" => false,
                "error" => "File not found! Unable to delete." . $url,
                "path" => $uuid
            );
        }

    }


    /**
     *
     */
    protected function cleanupChunks()
    {
        foreach (scandir($this->chunksFolder) as $item) {
            if ($item == "." || $item == "..")
                continue;

            $path = $this->chunksFolder . DIRECTORY_SEPARATOR . $item;

            if (!is_dir($path))
                continue;

            if (time() - filemtime($path) > $this->chunksExpireIn) {
                $this->removeDir($path);
            }
        }
    }


    /**
     * @param $dir
     */
    protected function removeDir($dir)
    {
        foreach (scandir($dir) as $item) {
            if ($item == "." || $item == "..")
                continue;

            if (is_dir($item)) {
                $this->removeDir($item);
            } else {
                unlink(join(DIRECTORY_SEPARATOR, array($dir, $item)));
            }

        }
        rmdir($dir);
    }


    /**
     * @param $str
     * @return int
     */
    protected function toBytes($str)
    {
        $str = trim($str);
        $last = strtolower($str[strlen($str) - 1]);
        //$val;
        if (is_numeric($last)) {
            $val = (int)$str;
        } else {
            $val = (int)substr($str, 0, -1);
        }
        switch ($last) {
            case 'g':
            case 'G':
                $val *= 1024;
            case 'm':
            case 'M':
                $val *= 1024;
            case 'k':
            case 'K':
                $val *= 1024;
        }
        return $val;
    }


    /**
     * @param $directory
     * @return bool
     */
    protected function isInaccessible($directory)
    {
        $isWin = $this->isWindows();
        $folderInaccessible = ($isWin) ? !is_writable($directory) : (!is_writable($directory) && !is_executable($directory));
        return $folderInaccessible;
    }


    /**
     * @return bool
     */
    protected function isWindows()
    {
        $isWin = (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN');
        return $isWin;
    }


    /**
     * @param $data
     * @param $request
     * @return string
     */
    public function notZipped($data)
    {
        // $this->allowedExtensions = array();
        $this->sizeLimit = null;
        $this->inputName = "qqfile";
        $this->chunksFolder = storage_path('chunks');

        $hash = $data['id'];
        $name = $this->getName();


        //If all the uploads has been done; combine all the chunks
        if (isset($data['done'])) {
            $result = $this->combineChunks(storage_path('uploads'), $hash . '-' . $name);
        } else {
            \Log::info("Uploading file " . $hash . '-' . $name . " to " . storage_path('uploads'));
            // Call handleUpload() with the name of the folder
            $result = $this->handleUpload(storage_path('uploads'), $hash . '-' . $name);

            // To return a name used for uploaded file you can use the following line.
            $result["uploadName"] = $this->getUploadName();
        }

        //Check if its done or the upload name is set
        if (isset($data['done']) || !empty($result["uploadName"])) {
            $name = str_replace("'", "`", $name);
            File::firstOrCreate(
                [
                    'upload_id' => $data['upload_id'],
                    'secret_code' => $hash,
                    'file' => $name
                ]
            );
        }

        return json_encode($result);

    }


    /**
     * @param $data
     * @return array
     */
    public function zipped($data)
    {
        $total_files = $count = $data['zip'];
        $max_file_size = $data['settings']['max_size'] * 1048576;
        $password = ($data['password'] == null || $data['password'] == '') ? 'EMPTY' : md5($data['password']);
        $response_array = [];
        $response_array['upload_id'] = $data['upload_id'];
        $response_array['upload_fid'] = $data['fid'];
        $response_array['upload_type'] = $data['share'];
        $total_size = $data['qqtotalfilesize'];
        if ($total_size < 0) {
            $total_size = $total_size + (4 * 1024 * 1024 * 1024);
        }

        //When file count is greator than 1
        if ($total_files > 1) {

            //Change status to zipping file in upload logs table
            $this->InsertorUpdateUploadLog($data, ['status' => 'zipping files']);

            //Creates zip file
            $files = File::where('upload_id', $data['upload_id'])->get();
            $zip_location = storage_path($data['upload_dir'] . '/' . $data['name_on_file'] . '-' . $data['upload_id'] . '.zip');
            $zip = new \ZipArchive();
            $zip->open($zip_location, \ZipArchive::CREATE);
            $index = 0;
            foreach ($files as $row) {
                $file_name = $row->file;
                $secret = $row->secret_code;
                $zip->addFile(storage_path($data['upload_dir'] . '/' . $secret . '-' . $file_name), $file_name);
                $zip->setCompressionIndex($index, \ZipArchive::CM_STORE);
                $index++;
            }

            $zip->close();

            //Remove unzipped file
            $this->removeUnzippedFile($data['upload_id']);

        }


        //Insert record in uploads table
        $this->insertorUpdateUpload([
            'upload_id' => $data['upload_id'],
            'email_from' => $data['email_from'],
            'message' => $data['message'],
            'secret_code' => md5(time() . rand()),
            'password' => $password,
            'status' => 'processing',
            'size' => $total_size,
            'time' => time(),
            'ip' => $data['ip'],
            'count' => $total_files,
            'share' => $data['share'],
            'destruct' => $data['destruct'],
            'upload_lang' => '', //todo
            'upload_server' => $data['upload_server'],
            'u_type' => $data['u_type'],
            'fid' => $data['fid'],
            'time_expire' => $data['time_expire'],
            'lang' => $data['upload_language']
        ], $data);

        //check if total files count is greator than max uploadable limit
        if ($total_files == $data['settings']['max_files'] || $total_files < $data['settings']['max_files'] || $data['settings']['max_files'] == '') {
            if ($total_size < $max_file_size) {
                if ($data['share'] == 'mail') {
                    $upload_hash = md5(time() . rand());
                    $long_url = $data['our_site_url'] . $data['upload_id'];
                    $short_url = $data['our_short_url'] . $data['upload_id'];

                    //Insert record in short url table
                    $this->insertOrUpdateShortURL([
                        'fid' => $short_url,
                        'link' => $long_url,
                        'type' => $data['share'],
                        'upload_id' => $data['upload_id'],
                        'privateid' => 0,
                        'secretkey' => $upload_hash
                    ], $data);
                    $response_array['ShortUrlFid'] = $short_url;


                    //Insert record in uploads table
                    $this->insertOrUpdateUpload([
                        'upload_id' => $data['upload_id'],
                        'email_from' => $data['email_from'],
                        'message' => $data['share'],
                        'secret_code' => $upload_hash,
                        'password' => $password,
                        'status' => 'ready',
                        'size' => $total_size,
                        'time' => time(),
                        'ip' => $_SERVER['REMOTE_ADDR'],
                        'count' => $total_files,
                        'share' => $data['share'],
                        'destruct' => $data['destruct'],
                        'upload_lang' => '',
                        'upload_server' => $data['upload_server'],
                        'u_type' => $data['u_type'],
                        'fid' => $data['fid'],
                        'time_expire' => time() + $data['settings']['expire'],
                        'lang' => $data['upload_language']
                    ], $data);

                    //Set status to uploaded in upload logs
                    $this->insertOrUpdateUploadLog($data, [
                        'status' => 'uploaded',
                        'timeend' => time()
                    ]);

                    //Send Emails to all receivers
                    $email_count = 0;
                    $emails_to_SGB = "";
                    foreach ($_POST['email_to'] as $email_to) {
                        $private_id = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 15);
                        $this->insertOrUpdateReceivers([
                            'email' => $short_url,
                            'private_id' => $private_id,
                            'upload_id' => $data['id']
                        ], $data);

                        $email_count = $email_count + 1;
                        $emails_to_SGB .= $email_to . "<br/>";

                        $short_code = $this->getShortUrl(6);
                        $tmp_long_url = $data['our_site_url'] . $data['upload_id'];
                        $tmp_short_url = $data['our_short_url'] . $short_code;

                        //Insert record in short url table
                        $this->insertOrUpdateShortURL([
                            'fid' => $tmp_short_url,
                            'link' => $tmp_long_url,
                            'type' => $data['share'],
                            'upload_id' => $data['upload_id'],
                            'privateid' => 0,
                            'secretkey' => $upload_hash
                        ], $data);

                        //check spam
                        if ($this->isSPAM($data['message'])) {
                            //if spam set status as SPAM
                            $this->insertOrUpdateUploadLog([
                                'status' => 'SPAM',
                                'timemoving' => time()
                            ], $data);

                            $this->insertOrUpdateUpload([
                                'status' => 'SPAM'
                            ], $data);

                        }

                        //Send email
                        $this->emailToReceiver($email_to, array_merge($data, [
                            'private_id' => $private_id
                        ]));
                        \Log::info("Send Email to receiver: {$email_to}");
                    }

                    //Send email to sender
                    $this->emailToSender($email_to, array_merge($data, [
                        'email_count' => $email_count,
                        'emails_to_SGB' => $emails_to_SGB,
                        'private_id' => $private_id
                    ]));

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
     * @param $email_to
     * @param $params
     */
    public function emailToReceiver($email_to, $params)
    {
        $tokens = array(
            'email_to' => $params['emails_to'],
            'email_from' => $params['email_from'],
            'size' => round($params['total_size'] / 1048576, 2),
            'site_name' => $params['site_name'],
            'upload_id' => $params['upload_id'],
            'message' => nl2br($params['message']),
            'total_files' => $params['total_files'],
            'time_expire' => date('j.n.Y', $params['time_expire']),
            //'expire_time' => strReplaceAssoc($params['replacetime'], secs_to_h($params['expire'])),
            // 'expire_time_eng' => secs_to_h($params['expire']),
            'upload_fid' => $params['short_url_fid'],
            'download_btn' => '<a href="' . $params['our_site_url'] . '?download=" ' . $params['upload_id'] . '" target="_blank" style="display:inline-block; margin:0; background-color:#f1592a; padding:10px 10px;  width:160px; font-size:15px;color:#ffffff; text-decoration:none;margin-top:10px;">',
            'download_url' => $params['our_site_url'] . '?download=' . $params['upload_id'],
            'password' => $params['password'],
            'file_names' => $params['file_names_SGB'],
            'file_list' => $params['file_names'],
            'email_list' => $params['email_list'],
        );

        $pattern = '{%s}';

        $map = array();
        foreach ($tokens as $var => $value) {
            $map[sprintf($pattern, $var)] = $value;
        }

        $message_receiver = strtr($params['message_receiver'], $map);
        $receiver_subject = strtr($params['receiver_subject'], $map);


        /*Mail::to($email_to)
             ->subject($receiver_subject)
             ->queue($message_receiver);*/
    }


    /**
     * @param $email_to
     * @param $params
     */
    public function emailToSender($email_to, $params)
    {
        $tokens = array(
            'emails_to_count' => $params['email_count'],
            'emails_to_SGB' => $params['emails_to_SGB'],
            'email_from' => $params['email_from'],
            'size' => round($params['total_size'] / 1048576, 2),
            'site_name' => $params['site_name'],
            'upload_id' => $params['upload_id'],
            'message' => nl2br($params['message']),
            'upload_fid' => $params['fid'],
            'total_files' => $params['total_files'],
            'time_expire' => date('j.n.Y', $params['time_expire']),
            //'expire_time' => strReplaceAssoc($params['replacetime'], secs_to_h($params['expire'])),
            'password' => $params['password'],
            'file_names' => $params['file_names_SGB'],
            'file_list' => $params['file_names'],
            'email_list' => $params['email_list'],
            'download_btn' => '<a href="' . $params['our_site_url'] . $params['upload_id'] . '" target="_blank" style="display:inline-block; margin:0; background-color:#f1592a; padding:10px 10px;  width:160px; font-size:15px;color:#ffffff; text-decoration:none;margin-top:10px">',
            'download_url' => $params['our_site_url'] . $params['upload_id']
        );
        $pattern = '{%s}';

        $map = array();
        foreach ($tokens as $var => $value) {
            $map[sprintf($pattern, $var)] = $value;
        }

        $message_sender = strtr($params['message_sender'], $map);
        $sender_subject = strtr($params['sender_subject'], $map);


        /* Mail::to($email_to)
             ->subject($message_sender)
             ->queue($sender_subject);*/
    }


    /**
     * @param $params
     * @param $data
     * @return mixed
     */
    public function insertOrUpdateUpload($params, $data)
    {
        try {
            $upload = Upload::where('upload_id', $params['upload_id'])->first();
            if (!$upload) {
                $upload = UploadLog::create($params);
            }
            return $upload;
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            MysqlLog::create([
                'upload_id' => $params['upload_id'],
                'time' => time(),
                'ip' => $data['ip'],
                'error' => $e->getMessage(),
                'sql' => '',
                'type' => 'upload',
                'query' => ''
            ]);
        }
    }


    /**
     * @param $params
     * @param $data
     * @return mixed
     */
    public function insertOrUpdateUploadLog($params, $data)
    {
        try {
            $log = UploadLog::where('upload_id', $params['upload_id'])->first();
            if (!$log) {
                $log = UploadLog::create($params);
            }
            return $log;
        } catch (\Exception $e) {
            \Log::info($e->getMessage());
            MysqlLog::create([
                'upload_id' => $params['upload_id'],
                'time' => time(),
                'ip' => $data['ip'],
                'error' => $e->getMessage(),
                'sql' => '',
                'type' => 'upload'
            ]);
        }
    }


    /**
     * @param $params
     * @param $data
     * @return mixed
     */
    public function insertOrUpdateShortURL($params, $data)
    {
        try {
            $short_url = ShortUrl::where('upload_id', $params['upload_id'])->first();
            if(!$short_url){
                $short_url->update($data);
            }
            return $short_url;
        } catch (\Exception $e) {
            MysqlLog::create([
                'upload_id' => $params['upload_id'],
                'time' => time(),
                'ip' => $data['ip'],
                'error' => $e->getMessage(),
                'sql' => '',
                'type' => 'upload'
            ]);
        }
    }


    /**
     * @param $params
     * @param $data
     * @return mixed
     */
    public function insertOrUpdateReceivers($params, $data)
    {
        try {
            $short_url = Receiver::where('upload_id', $params['upload_id']);
            if(!$short_url){
                $short_url->update($data);
            }
            return $short_url;
        } catch (\Exception $e) {
            MysqlLog::create([
                'upload_id' => $params['upload_id'],
                'time' => time(),
                'ip' => $data['ip'],
                'error' => $e->getMessage(),
                'sql' => '',
                'type' => 'upload'
            ]);
        }
    }


    /**
     * @param $upload_id
     */
    public function removeUnzippedFile($upload_id)
    {
        $files_to_remove = File::where('upload_id', $upload_id)->get();
        foreach ($files_to_remove as $file) {
            $file_name = $file->file;
            $secret = $file->secret_code;
            $file_location = "uploads/{$secret}-{$file_name}";
            Storage::disk('local')->delete($file_location);
        }
    }

    /**
     * @param $message
     * @return bool
     */
    public function isSPAM($message)
    {
        $record = BannedMessage::where('ban_message', 'LIKE', "%$message%")
            ->where('ban_expire', '>', time())
            ->get();
        return isset($record) ? true : false;
    }


    /**
     * @param $count
     * @return mixed
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
     * @param $request
     * @return string
     */
    public function ajax($request)
    {
        $langs = 'en';
        $data = $request->all();
        switch ($data['opt']) {
            //Insert log in sendgb_upload_logs table and return unique id
            case "ins":
                try {

                    $short_url = $this->getShortUrl(11, $data['id']);
                    $this->insertOrUpdateUploadLog([
                        'upload_id' => $short_url,
                        'status' => 'uploading',
                        'time' => time(),
                        'timemoving' => '',
                        'timezipping' => '',
                        'timeend' => '',
                        'ip' => $_SERVER['REMOTE_ADDR'],
                        'upload_lang' => $langs,
                        'size' => $data['size'],
                        'count' => $data['files'],
                        'type' => $data['type'],
                        'utype' => $data['utype'],
                        'hua' => $_SERVER['HTTP_USER_AGENT']
                    ], $data);
                    return $short_url;

                } catch (\Exception $e) {
                    \Log::error($e->getMessage());
                    return "NOT";
                }
            case "abandoned":
                try {
                    $this->insertOrUpdateUploadLog([
                        'status' => 'closed',
                        'timeend' => time()
                    ], array_merge($data, ['id' => $data['id']]));

                    return "OK";
                } catch (\Exception $e) {
                    return "NOT";
                }
            case "canceled":
                try {
                    $this->insertOrUpdateUploadLog(
                        [
                            'status' => 'canceled',
                            'timeend' => time()
                        ], array_merge($data, ['id' => $data['id']])
                    );
                    return "OK";
                } catch (\Exception $e) {
                    return "NOT";
                }
            default:
                break;
        }
    }

    /**
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

}