<?php

namespace App\Http\Controllers;

use App\{
    File,
    Upload,
    Receiver,
    Download,
    DownloadLog
};
use Illuminate\Http\Request;
use App\Helpers\UploadHelper;
use Chumper\Zipper\Facades\Zipper;
use App\Http\Traits\{
    UploadTrait,
    SettingsTrait
};
use ZipStream\ZipStream;

class UploadController extends Controller
{

    use UploadTrait,
        SettingsTrait;

    /**
     * Upload files handler
     *
     * @param Request $request
     * @return array
     * @internal param SettingsHelper $settingsHelper
     */
    public function upload(Request $request)
    {
        $result = array();

        $data = $request->all();
        $settings = $this->getSettings();

        $this->setData($data, $settings, $request);

        // Store uploaded files
        if (!$request->has('zip')) {
            $result = $this->uploadNotZipped($data, $request);
        }

        // Complete file uploading
        if ($request->has('zip') && $request->has('id')) {
            $result = $this->uploadComplete($data, $request);
        }

        return $result;
    }


    /**
     * @param Request $request
     * @return array|\Illuminate\Http\JsonResponse|mixed|string
     */
    public function ajax(Request $request)
    {
        switch ($request->opt) {
            //Insert log in sendgb_upload_logs table and return unique id
            case "ins":
                return $this->insertLog($request);

            case "abandoned":
                return $this->insertLog($request, [
                    'status' => 'closed',
                    'timeend' => time()
                ]);

            case "canceled":
                return $this->insertLog($request, [
                    'status' => 'canceled',
                    'timeend' => time()
                ]);

            case "download":
                return $this->checkDownload($request);

            case 'report':
                return $this->reportDownload($request);

            default:
                break;
        }
    }


    /**
     * Check and download
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function download(Request $request) {

        $time = time();
        $ip_address = $request->ip();
        $private_id = $request->private_id;
        $secret_code = $request->secret_code;
        $download_id = $request->download_id;

        $receiver = Receiver::where('upload_id', $download_id)->first();
        $download_email = optional($receiver)->email;

        // Get a uploaded items
        $upload = Upload::where('upload_id', $download_id)
            ->where('secret_code', $secret_code)
            ->with('files')
            ->first();

        // Create a download log
        $downloadLog = DownloadLog::create([
            'uploadid' => $upload->upload_id,
            'status' => 'downloading',
            'time' => time(),
            'timeend' => '',
            'size' => round($upload->size / 1048576, 2),
            'count' => $upload->count,
            'utype' => $this->getBrowserType($request),
            'ip' => $ip_address,
            'download_email' => $download_email ?? '',
            'sid' => session_id(),
            'hua' => $request->userAgent(),
        ]);

        // Check if file is password protected
        if($upload->password != 'EMPTY') {
            if($upload->password !== md5($request->password)) {
                DownloadLog::updateOrCreate([
                    'uploadid' => $upload->upload_id
                ], [
                    'download_id' => $download_id,
                    'time' => time(),
                    'ip' => $ip_address,
                    'email' => $download_email ?? '',
                    'status' => 'PASS ERR',
                    'timeend' => ''
                ]);

                return response()->json([
                    'message' => 'password error'
                ], 403);
            }
        }

        $this->createDownload($request, $upload, $download_email);

        // Create a download item
        Download::create([
            'download_id' => $request->download_id,
            'time' => time(),
            'ip' => $request->ip(),
            'email' => $d_email ?? ''
        ]);

        $downloadLog->update([
            'status' => 'downloaded',
            'timeend' => time()
        ]);
    }

    /**
     * Download the files
     *
     * @param Request $request
     * @param $upload
     * @param $d_email
     */
    public function createDownload(Request $request, $upload, $d_email) {

        // Check if there exists a download from this user before
        $check_download = Download::where('download_id', $request->download_id)
            ->where('email', $d_email)
            ->get();

        // Send the download emails
        if($check_download->count() == 0 && $upload->share == 'mail' && $d_email != '') {
            //TODO
        }

        // Increment downloads to the specific download
        $upload->increment('dcount');

        // Check if the download has more than one item
        if($upload->count > 1 && ! $request->has('file_id')) {

            //Creates zip file
            $files = File::where('upload_id', $request->download_id)->get();

            # create a new zipstream object
            $zip = new ZipStream("sendgb-$request->download_id.zip");

            foreach ($files as $k => $row) {
                $file_name = $row->location;
                # add a file named 'some_image.jpg' from a local file 'path/to/image.jpg'
                $zip->addFileFromPath(
                    $row->file,
                    storage_path('app'. DIRECTORY_SEPARATOR. 'uploads' . DIRECTORY_SEPARATOR . $file_name),
                    [],
                    'store'
                );
            }

            # finish the zip stream
            $zip->finish();

        } else {

            $file = File::where('upload_id', $request->download_id)->first();

            if( $request->has('file_id') ) {
                $file = File::find($request->file_id);
            }

            header('Content-Disposition: attachment; filename="'.$file->file.'"');

            $this->readAndDownload(
                storage_path('app').
                DIRECTORY_SEPARATOR.
                'uploads'. DIRECTORY_SEPARATOR . $file->location
            );
        }

        // Download single file
        if( ! $request->has('file_id') ) {
            // Check if files should be destroyed
            $this->checkDestroy($upload, $d_email);
        }
    }

    /**
     * Check and destroy file
     *
     * @param $upload
     * @param $d_email
     */
    public function checkDestroy($upload, $d_email) {
        if(strtolower($upload->destruct) == 'yes') {
            foreach ($upload->files as $file) {
                $filePath = storage_path('app').DIRECTORY_SEPARATOR.'uploads'
                    .DIRECTORY_SEPARATOR.$file->location;
                if($upload->share == 'mail' && $d_email != '') {
                    if( $upload->downloads->count() >= $upload->receivers->count() ) {
                        $upload->update([ 'status' => 'destroyed' ]);
                        unlink( $filePath );
                        // TODO
                    }
                } elseif($upload->share == 'link') {
                    $upload->update([ 'status' => 'destroyed' ]);
                    unlink( $filePath );
                    // TODO
                }
            }
        }
    }

    public function readAndDownload($path){

        ob_end_clean();
        $opened_file = fopen($path,"rb");

        while(!feof($opened_file)) {
            print(fread($opened_file, 1024*256));
            flush();
            if (connection_status()==1)  {
                \Log::info('error downloading');
                fclose($opened_file);
                exit;
            } elseif(connection_status()==2) {
                \Log::info('error downloading');
                fclose($opened_file);
                exit;
            } elseif(connection_status()==3) {
                \Log::info('error downloading');
                fclose($opened_file);
                exit;
            } elseif(connection_status()!=0) {
                \Log::info('error downloading');
                fclose($opened_file);
                exit;
            }
        }
        
        fclose($opened_file);
    }
    /**
     * @return string
     */
    public function delete()
    {
        return 'success';
    }

    /**
     * @return string
     */
    public function options()
    {
        return "ok";
    }


    public function oldDownload(Request $request) {

        $time = time();
        $ip_address = $request->ip();
        $private_id = $request->private_id;
        $secret_code = $request->secret_code;
        $download_id = $request->download_id;

        $receiver = Receiver::where('upload_id', $download_id)->first();
        $download_email = optional($receiver)->email;

        $upload = Upload::where('upload_id', $download_id)
            ->where('secret_code', $secret_code)
            ->with('files')
            ->first();

        $files = $upload->files;

        // Create a download log
        DownloadLog::create([
            'uploadid' => $upload->upload_id,
            'status' => 'downloading',
            'time' => time(),
            'timeend' => '',
            'size' => round($upload->size / 1048576, 2),
            'count' => $upload->count,
            'utype' => $this->getBrowserType($request),
            'ip' => $ip_address,
            'download_email' => $download_email ?? '',
            'sid' => session_id(),
            'hua' => $request->userAgent(),
        ]);

        // Check if file is password protected
        if($upload->password != 'EMPTY') {
            // If passwords match
            if($upload->password == md5($request->password)) {

                if($upload->count > 1) {

                    $check_download = Download::where('download_id', $download_id)
                        ->where('email', $download_email)
                        ->get();

                    if($check_download->count()) {
                        //TODO
                        //emailSender($message_downloaded,$downloaded_subject,$rows['email_from'],$download_email,$download_id,'download notification WP');
                    }

                    $download = Download::create([
                        'download_id' => $download_id,
                        'time' => $time,
                        'ip' => $ip_address,
                        'email' => $download_email ?? ''
                    ]);

                    $upload->increment('dcount');

                    //Creates zip file
                    $files = File::where('upload_id', $download_id)->get();
                    $zip_location = storage_path('app'. DIRECTORY_SEPARATOR. 'uploads'
                        . DIRECTORY_SEPARATOR . 'sendgb-' . $download_id . '.zip');

                    // Make a zip in given location
                    $zip = Zipper::make($zip_location);
                    // Add files to created zip
                    foreach ($files as $k => $row) {
                        $file_name = $row->location;
                        $secret = $row->secret_code;
                        $zip->add(
                            storage_path('app'. DIRECTORY_SEPARATOR. 'uploads' . DIRECTORY_SEPARATOR . $secret . '-' . $file_name),
                            $file_name
                        );
                    }

                    header('Content-Disposition: attachment; filename="'.'sendgb-' . $download_id.'.zip'.'"');

                    if(strtolower($upload->destruct) == 'yes') {
                        if($upload->share == 'mail' && $download_email != '') {
                            $get_downloads_info = Download::where('download_id', $download_id)->get();
                            $get_receivers_info = Receiver::where('upload_id', $download_id)->get();
                            if($get_downloads_info->count() == $get_receivers_info->count()) {
                                Upload::where('upload_id', $download_id)
                                    ->where('secret_code', $secret_code)
                                    ->update(['status' => 'destroyed']);

                                unlink(
                                    storage_path('app').
                                    DIRECTORY_SEPARATOR.
                                    'uploads'.
                                    DIRECTORY_SEPARATOR .'sendgb-' . $upload->upload_id.'.zip'
                                );
                                //TODO
                                //emailSender($message_destruct,$destroyed_subject,$des_emailfrom,'',$download_id,'download destruct WP');
                            }
                        } elseif($upload->share == 'link') {
                            Upload::where('upload_id', $download_id)
                                ->where('secret_code', $secret_code)
                                ->update(['status' => 'destroyed']);

                            unlink(
                                storage_path('app').
                                DIRECTORY_SEPARATOR.
                                'uploads'.
                                DIRECTORY_SEPARATOR .'sendgb-' . $upload->upload_id.'.zip'
                            );
                            //TODO
                        }
                    }

                } else {

                    foreach ($files as $file) {

                        $check_download = Download::where('download_id', $download_id)
                            ->where('email', $download_email)
                            ->get();

                        if($check_download->count() == 0 && $upload->share == 'mail' && $download_email != '') {
                            //TODO
                        }

                        $download = Download::create([
                            'download_id' => $download_id,
                            'time' => $time,
                            'ip' => $ip_address,
                            'email' => $download_email ?? ''
                        ]);

                        header('Content-Disposition: attachment; filename="'.$upload->upload_id . '-' . $file->file.'"');

                        $upload->increment('dcount');

                        if(strtolower($upload->destruct) == 'yes') {
                            if($upload->share == 'mail') {
                                $get_downloads_info = Download::where('download_id', $download_id)->get();
                                $get_receivers_info = Receiver::where('upload_id', $download_id)->get();
                                if($get_downloads_info->count() == $get_receivers_info->count()) {
                                    Upload::where('upload_id', $download_id)->update(['status' => 'destroyed']);
                                    unlink(
                                        storage_path('app').
                                        DIRECTORY_SEPARATOR.
                                        'uploads'.
                                        DIRECTORY_SEPARATOR .
                                        $upload->upload_id . '-' . $file->file
                                    );
                                    //TODO
                                }
                            } elseif($upload->share == 'link') {
                                Upload::where('upload_id', $download_id)->update(['status' => 'destroyed']);

                                unlink(
                                    storage_path('app').
                                    DIRECTORY_SEPARATOR.
                                    'uploads'.
                                    DIRECTORY_SEPARATOR .
                                    $upload->upload_id . '-' . $file->file
                                );
                                //TODO
                            }
                        }

                    }
                }
            } else {
                $time = time();

                DownloadLog::updateOrCreate([
                    'uploadid' => $upload->upload_id,
                    'sid' =>  session_id(),
                    'time' => $time
                ], [
                    'download_id' => $download_id,
                    'time' => $time,
                    'ip' => $ip_address,
                    'email' => $download_email ?? '',
                    'status' => 'PASS ERR',
                    'timeend' => ''
                ]);

                return response()->json(['message' => 'password error'], 403);
            }
        } else {

            if($upload->count > 1) {

                $check_download = Download::where('download_id', $download_id)
                    ->where('email', $download_email)
                    ->get();

                if($check_download->count() == 0 && $upload->share == 'mail' && $download_email != '') {
                    //TODO
                }

                $download = Download::create([
                    'download_id' => $download_id,
                    'time' => $time,
                    'ip' => $ip_address,
                    'email' => $download_email ?? ''
                ]);

                $upload->increment('dcount');

                //Creates zip file
                $files = File::where('upload_id', $download_id)->get();

                # create a new zipstream object
                $zip = new ZipStream("sendgb-$download_id.zip");

                foreach ($files as $k => $row) {
                    $file_name = $row->location;
                    # add a file named 'some_image.jpg' from a local file 'path/to/image.jpg'
                    $zip->addFileFromPath(
                        $file_name,
                        storage_path('app'. DIRECTORY_SEPARATOR. 'uploads' . DIRECTORY_SEPARATOR . $file_name),
                        [],
                        'store'
                    );
                }

                # finish the zip stream
                $zip->finish();

                if(strtolower($upload->destruct) == 'yes') {
                    if($upload->share == 'mail' && $download_email != '') {
                        $get_downloads_info = Download::where('download_id', $download_id)->get();
                        $get_receivers_info = Receiver::where('upload_id', $download_id)->get();
                        if($get_downloads_info->count() == $get_receivers_info->count()) {
                            Upload::where('upload_id', $download_id)->update(['status' => 'destroyed']);
                            unlink(
                                storage_path('app').
                                DIRECTORY_SEPARATOR.
                                'uploads'.
                                DIRECTORY_SEPARATOR .'sendgb-' . $upload->upload_id.'.zip'
                            );
                            //TODO
                        }
                    } elseif($upload->share == 'link') {
                        Upload::where('upload_id', $download_id)->update(['status' => 'destroyed']);

                        unlink(
                            storage_path('app').
                            DIRECTORY_SEPARATOR.
                            'uploads'.
                            DIRECTORY_SEPARATOR .'sendgb-' . $upload->upload_id.'.zip'
                        );
                        //TODO
                    }
                }

            } else {

                foreach ($files as $file) {

                    header('Content-Disposition: attachment; filename="'.$upload->upload_id . '-' . $file->file.'"');


                    $this->readAndDownload(
                        storage_path('app').
                        DIRECTORY_SEPARATOR.
                        'uploads'. DIRECTORY_SEPARATOR . $file->location
                    );

                    $check_download = Download::where('download_id', $download_id)
                        ->where('email', $download_email)
                        ->get();

                    if($check_download->count() == 0 && $upload->share == 'mail' && $download_email != '') {
                        //TODO
                    }

                    $download = Download::create([
                        'download_id' => $download_id,
                        'time' => $time,
                        'ip' => $ip_address,
                        'email' => $download_email ?? ''
                    ]);

                    $upload->increment('dcount');

                    if(strtolower($upload->destruct) == 'yes') {
                        if($upload->share == 'mail' && $download_email != '') {
                            $get_downloads_info = Download::where('download_id', $download_id)->get();
                            $get_receivers_info = Receiver::where('upload_id', $download_id)->get();
                            if($get_downloads_info->count() == $get_receivers_info->count()) {
                                Upload::where('upload_id', $download_id)->update(['status' => 'destroyed']);
                                unlink(
                                    storage_path('app').
                                    DIRECTORY_SEPARATOR.
                                    'uploads'. DIRECTORY_SEPARATOR. $file->file
                                );
                                //TODO
                            }
                        } elseif($upload->share == 'link') {
                            Upload::where('upload_id', $download_id)->update(['status' => 'destroyed']);

                            unlink(
                                storage_path('app').
                                DIRECTORY_SEPARATOR.
                                'uploads'.
                                DIRECTORY_SEPARATOR .
                                $upload->upload_id . '-' . $file->file
                            );
                            //TODO
                        }
                    }

                }
            }
        }
    }
}