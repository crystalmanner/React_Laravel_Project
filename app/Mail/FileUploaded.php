<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class FileUploaded extends Mailable implements ShouldQueue
{
    use Queueable,
        SerializesModels;

    public $subject, $data, $template;

    /**
     * Create a new message instance.
     * @param $subject
     * @param $data
     * @param $template
     */
    public function __construct($subject, $data, $template)
    {
        $this->data = $data;
        $this->subject = $subject;
        $this->template = $template;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view($this->template)
            ->subject($this->subject)
            ->with($this->data);
    }
}
