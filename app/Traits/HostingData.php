<?php


namespace App\Traits;

use DB;

trait HostingData
{
    public static function scopeRelations($query)
    {
        return $query->with([
            '_comments',
            '_customer',
            '_server',
            '_sites'
        ]);
    }

    public static function scopeForShow($query)
    {
        return $query->withCount([
            '_server AS hostingPlan' => function($query) {
                $query->select(DB::raw("SUM(month_expense)"));
            },
            '_server AS serverName' => function($query) {
                $query->select(DB::raw("name"));
            },
            '_customer AS customerName' => function($query) {
                $query->select(DB::raw("name"));
            },
            '_customer AS customerPhone' => function($query) {
                $query->select(DB::raw("phone"));
            },
            '_customer AS customerEmail' => function($query) {
                $query->select(DB::raw("email"));
            },
            '_sites AS site' => function($query) {
                $query->select(DB::raw("name"))->limit(1);
            }
        ]);
    }
}
