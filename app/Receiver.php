<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Receiver
 * @package App
 */
class Receiver extends Model
{
    /**
     * @var string
     */
    protected $table = 'receivers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'upload_id',
        'email',
        'private_id',
    ];

    /**
     * @var bool
     */
    public $timestamps = false;
}
