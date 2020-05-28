<?php

namespace App\Models;

use App\Http\Filters\Filterable;
use App\Traits\TableData;
use Illuminate\Database\Eloquent\Model;

class Fop extends Model
{
    use Filterable;
    use TableData;

    const Paginate_PerPage = 1000;

    protected $table = 'fops';

    protected $fillable = [
        'name',
        'address',
        'activities',
        'registrationNumber',
        'registerLocation',
        'registrationDate',
        'phone',
        'email',
        'taxNumber',
    ];

    protected $dates = ['created_at', 'updated_at'];

    protected $casts = [
        'activities' => 'array'
    ];

    //--start GETTERS
    public function getId()
    {
        return $this->id;
    }
    //--end GETTERS

    //--start SETTERS
    //--end SETTERS

    //--start RELATIONS
    public function _fop_incomes()
    {
        return $this->hasMany('App\Models\FopIncome', 'fop_id', 'id');
    }
    public function _fop_taxes()
    {
        return $this->hasMany('App\Models\FopTax', 'fop_id', 'id');
    }
    //--end RELATIONS
}
