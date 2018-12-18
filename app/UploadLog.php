<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class UploadLog
 * @package App
 */
class UploadLog extends Model
{
    /**
     * @var string
     */
    protected $table = 'uploads_log';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'uploadid',
        'status',
        'time',
        'timemoving',
        'timezipping',
        'timeend',
        'ip',
        'upload_lang',
        'size',
        'count',
        'type',
        'utype',
        'hua'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;
}
