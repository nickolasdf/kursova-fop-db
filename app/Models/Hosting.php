<?php


namespace App\Models;

use App\Http\Filters\Filterable;
use App\Traits\HostingData;
use App\Traits\TableData;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Hosting
 *
 */

class Hosting extends Model
{
    use SoftDeletes, Filterable;
    use HostingData, TableData;

    const Paginate_PerPage = 1000;

    protected $table = 'hostings';

    protected $fillable = [
        'server_id',
        'customer_id',
        'expense',
        'expired_at',
        'access_hosting',
        'access_domain',
    ];

    protected static $sortableFields = ['expense', 'expired_at', 'serverName','customerName','customerPhone','customerEmail','site'];

    protected $dates = ['created_at', 'updated_at', 'deleted_at', 'expired_at'];

    protected $appends = [
        /*'serverName',
        'hostingPlan',
        'customerName',
        'customerPhone',
        'customerEmail',*/
    ];

    //--start GETTERS
    public function getId()
    {
        return $this->id;
    }
    /*public function getServerNameAttribute()
    {
        return $this->_server ?  $this->_server->name : null;
    }
    public function getHostingPlanAttribute()
    {
        return $this->_server ?  $this->_server->month_expense : null;
    }
    public function getCustomerNameAttribute()
    {
        return $this->_customer ?  $this->_customer->name : null;
    }
    public function getCustomerPhoneAttribute()
    {
        return $this->_customer ?  $this->_customer->phone : null;
    }
    public function getCustomerEmailAttribute()
    {
        return $this->_customer ?  $this->_customer->email : null;
    }*/
    //--end GETTERS

    //--start SETTERS
    public function setExpiredAtAttribute($value)
    {
        $this->attributes['expired_at'] = Carbon::create($value);
    }
    //--end SETTERS

    //--start RELATIONS
    public function _server()
    {
        return $this->belongsTo('App\Models\Server', 'server_id', 'id');
    }
    public function _customer()
    {
        return $this->belongsTo('App\Models\Customer', 'customer_id', 'id');
    }
    public function _comments()
    {
        return $this->morphMany('App\Models\Comment', 'model');
    }
    public function _sites()
    {
        return $this->hasMany('App\Models\Site','hosting_id','id');
    }
    public function _statistics()
    {
        return $this->hasMany('App\Models\HostingStatistic','hosting_id','id');
    }
    //--end RELATIONS
}
