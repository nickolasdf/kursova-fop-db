<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tax extends Model
{
    use SoftDeletes;

    protected $table = 'taxes';

    protected $fillable = [
        'title',
        'percent',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    //--start GETTERS
    public function getId()
    {
        return $this->id;
    }
    //--end GETTERS

    //--start SETTERS
    //--end SETTERS

    //--start RELATIONS
    public function _fop_taxes()
    {
        return $this->hasMany('App\Models\FopTax', 'tax_id', 'id');
    }
    //--end RELATIONS
}
