<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DownloadLog extends Model
{
    protected $table = 'downloads_log';

    protected $fillable = [
        'uploadid',
        'status',
        'time',
        'timeend',
        'size',
        'count',
        'utype',
        'ip',
        'download_email' ,
        'sid',
        'hua'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;
}
