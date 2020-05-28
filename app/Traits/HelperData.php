<?php

namespace App\Traits;

use Illuminate\Foundation\Http\FormRequest;

trait HelperData
{
    public function prepareData(FormRequest $request)
    {
        $data = collect($request->validated())->except(key($request->route()->parameters()))->toArray();

        return $data;
    }

}
