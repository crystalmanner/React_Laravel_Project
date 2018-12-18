<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UploadChecker extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete:expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $uploads = Upload::where('status', 'ready')
            ->orWhere('status', 'SPAM')
            ->with('receivers', 'files')
            ->where('upload_server', '!=', 'Amazon S3')
            ->get();

        foreach ($uploads as $upload){
            if( time() >= $upload->time_expire) {

                $email_list = '<ul>';
                $emails_to_SGB = $file_names_SGB = '';

                $receivers = $upload->receivers;
                foreach ($receivers as $receiver) {
                    $email_list .= '<li>' . $receiver->email . '</li>';
                    $emails_to_SGB = $receiver->mail . "<br/>" . $emails_to_SGB;
                }
                $email_list .= '</ul>';

                foreach($upload->files as $file) {
                    $file_names_SGB .= $file->file."<br/>";
                    $filePath = storage_path('app').DIRECTORY_SEPARATOR.'uploads'
                        .DIRECTORY_SEPARATOR.$file->location;
                    unlink($filePath);
                }

                $upload->update([ 'status' => 'destroyed' ]);

                if( $upload->status != 'SPAM' && $upload->share == 'mail') {

                    $upload_language = $upload->upload_lang ?? 'en';

                    //TODO send emails
                }
            }
        }
    }
}
