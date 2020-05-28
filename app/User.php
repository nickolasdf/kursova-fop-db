<?php

namespace App;

use App\Traits\TableData;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Http\Filters\Filterable;

class User extends Authenticatable
{

    use HasApiTokens, Notifiable, SoftDeletes, HasRoles, Filterable;
    use TableData;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password', 'remember_token'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [

    ];

    public function setPasswordAttribute($password) {
        $this->attributes['password'] = bcrypt($password);
    }
    //--start GETTERS
    public function getId()
    {
        return $this->id;
    }
    //--end GETTERS
    //--start RELATIONS

    //--end RELATIONS

}
