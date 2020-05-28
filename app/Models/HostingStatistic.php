<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Server
 *
 */

class HostingStatistic extends Model
{
    use SoftDeletes;

    protected $table = 'hosting_statistics';

    protected $fillable = [
        'hosting_id',
        'expense',
        'expired_at',
        'type',
        'description',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    //--start GETTERS
    public function getId()
    {
        return $this->id;
    }
    //--end GETTERS

    //--start RELATIONS
    public function _hosting()
    {
        return $this->belongsTo('App\Models\Hosting','hosting_id','id');
    }
    //--end RELATIONS
}
