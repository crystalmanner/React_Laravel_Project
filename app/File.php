<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class File
 * @package App
 */
class File extends Model
{
    /**
     * @var string
     */
    protected $table = 'files';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'upload_id',
        'secret_code',
        'file',
        'location'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;
}
