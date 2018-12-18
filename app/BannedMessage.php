<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class BannedMessage
 * @package App
 */
class BannedMessage extends Model
{
    /**
     * @var string
     */
    protected $table = 'banned_messages';

    public $timestamps = false;

}
