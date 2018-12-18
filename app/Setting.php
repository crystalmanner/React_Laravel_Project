<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Setting
 * @package App
 */
class Setting extends Model
{
    /**
     * @var string
     */
    protected $table = 'settings';

    /**
     * @var bool
     */
    public $timestamps = false;

}
