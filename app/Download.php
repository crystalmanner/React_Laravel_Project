<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Download extends Model
{
    protected $table = 'downloads';

    protected $fillable = [
        'download_id',
        'time',
        'ip',
        'email'
    ];

    public $timestamps = false;
}
