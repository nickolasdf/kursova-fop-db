<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

trait TableData
{
    public static function getSortableFields() {
        if(isset(self::$sortableFields) && is_array(self::$sortableFields)) {
            return self::$sortableFields;
        }

        return [];
    }

    public function scopeSearch($query, Request $request) {
        if($searchQuery = $request->get('query', false)) {
            $sortable = self::getSortableFields();

            return $query->where(function($query) use($searchQuery, $sortable) {
                $firstKey = array_key_first($sortable);
                foreach($sortable as $key => $field) {
                    if($key === $firstKey) {
                        $query = $query->where($field, 'LIKE', "%{$searchQuery}%");
                    }
                    else {
                        $query = $query->orWhere($field, 'LIKE', "%{$searchQuery}%");
                    }
                }
                return $query;
            });
        }

        return $query;
    }

    public static function scopeSorting($query, Request $request)
    {
        $orderField = $request->get('order_field', 'date');
        $orderType = $request->get('order_type',  'asc');
        $sortable = self::getSortableFields();
        if(in_array($orderField, $sortable)) {
            return $query->orderBy($orderField, $orderType);
        }

        return $query;
    }

}
