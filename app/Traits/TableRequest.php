<?php

namespace App\Traits;

trait TableRequest
{
    protected static $rules = [
        'order_field' => 'nullable|string',
        'order_type' => 'nullable|in:ASC,DESC',
        'per_page' => 'nullable|numeric|max:500',
        'page' => 'nullable|numeric',
        'search' => 'nullable|string',
    ];

    public function merge($rules) {

        return array_merge(self::$rules, $rules);
    }

}
