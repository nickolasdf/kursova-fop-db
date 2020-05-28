<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FopTax extends Model
{
    protected $table = 'fops_taxes';

    protected $fillable = [
        'fop_id',
        'fop_income_id',
        'tax_id',
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
    public function _fop_income()
    {
        return $this->belongsTo('App\Models\FopIncome', 'fop_income_id', 'id');
    }
    public function _tax()
    {
        return $this->belongsTo('App\Models\Tax', 'tax_id', 'id');
    }
    //--end RELATIONS
}
