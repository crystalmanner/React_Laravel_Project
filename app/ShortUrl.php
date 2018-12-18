<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ShortUrl
 * @package App
 */
class ShortUrl extends Model
{
    /**
     * @var string
     */
    protected $table = 'shorturl';

    /**
     * @var array
     */
    protected $fillable = [
        'fid',
        'link',
        'type',
        'uploadid',
        'privateid',
        'secretkey',
        'destroyed'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;
}
