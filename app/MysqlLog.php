<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class MysqlLog
 * @package App
 */
class MysqlLog extends Model
{
    /**
     * @var string
     */
    protected $table = 'mysql_log';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'uploadid',
        'time',
        'ip',
        'error',
        'query',
        'type'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;
}
