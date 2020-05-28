<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class FopFilter extends QueryFilter
{

    public $userFilter = [
        'site' => ['select' => 'value', 'table' => 'hosting', 'relation' => '_sites'],
        'customerName' => ['select' => 'value', 'table' => 'hosting', 'relation' => '_customer'],
        'customerPhone' => ['select' => 'value', 'table' => 'hosting', 'relation' => '_customer'],
    ];

    public function site(string $value)
    {
        $this->builder->whereHas('_sites', function (Builder $query) use ($value) {
            $query->where('name', 'like', "%{$value}%");
        });
    }

    public function customerName(string $value)
    {
        //$this->builder->where('customerName', 'like', "%{$value}%");

        $this->builder->whereHas('_customer', function (Builder $query) use ($value) {
            $query->where('name', 'like', "%{$value}%");
        });
    }

    public function customerPhone(string $value)
    {
        //$this->builder->where('customerPhone', 'like', "%{$value}%");

        $this->builder->whereHas('_customer', function (Builder $query) use ($value) {
            $query->where('phone', 'like', "%{$value}%");
        });
    }

}
