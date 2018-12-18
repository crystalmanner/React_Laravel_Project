<?php

namespace App\Helpers;

use Illuminate\Mail\Mailable;
use Mail;
use App\Mail\FileUploaded;

class EmailHelper
{
    public static function send(
        $template,
        $data = array(),
        $receivers = array(),
        $subject,
        $attachment_data = null,
        $attachment_name = null
    ){
        try{
            Mail::send($template, $data, function ($message) use (
                $receivers,
                $subject,
                $attachment_data,
                $attachment_name
            ){
                $message->from(config('mail.username'));
                $message->replyTo(config('mail.username'));
                $message->to($receivers);
                $message->subject($subject);
                if($attachment_data && $attachment_name){
                    $message->attachemnt($attachment_data, $attachment_name);
                }
            });
            return true;
        }catch (\Exception $e){
            \Log::info($e->getMessage());
            return false;
        }
    }

    public static function sendQueue(Mailable $mail, $receivers = array() ) {
        try{
            Mail::to($receivers)->queue($mail);
            return true;
        }catch (\Exception $e){
            \Log::info($e->getMessage());
            return false;
        }
    }
}

