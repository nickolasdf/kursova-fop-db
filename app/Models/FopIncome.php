<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FopIncome extends Model
{
    protected $table = 'fops_incomes';

    protected $fillable = [
        'fop_id',
        'total',
        'date',
    ];

    protected $dates = ['created_at', 'updated_at', 'date'];

    //--start GETTERS
    public function getId()
    {
        return $this->id;
    }
    //--end GETTERS

    //--start SETTERS
    //--end SETTERS

    //--start RELATIONS
    public function _fop()
    {
        return $this->belongsTo('App\Models\Fop', 'fop_id', 'id');
    }
    public function _fop_taxes()
    {
        return $this->hasMany('App\Models\FopTax', 'fop_income_id', 'id');
    }
    //--end RELATIONS
}
