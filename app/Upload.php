<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Upload
 * @package App
 */
class Upload extends Model
{
    /**
     * @var string
     */
    protected $table = 'uploads';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'upload_id',
        'email_from',
        'message',
        'secret_code',
        'password',
        'status',
        'size',
        'time',
        'time_expire',
        'ip',
        'count',
        'share',
        'destruct',
        'flag',
        'upload_lang',
        'upload_server',
        'u_type',
        'fid',
        'lang',
        'dcount'
    ];

    protected $hidden = [
        'password'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;

    public function files() {
        return $this->hasMany(File::class, 'upload_id', 'upload_id');
    }

    public function downloads() {
        return $this->hasMany(Download::class, 'download_id', 'upload_id');
    }

    public function receivers() {
        return $this->hasMany(Receiver::class, 'upload_id', 'upload_id');
    }
}
