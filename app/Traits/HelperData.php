<?php

namespace App\Traits;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

trait HelperData
{
    public function prepareData(FormRequest $request)
    {
        $data = collect($request->validated())->except(key($request->route()->parameters()))->toArray();

        if ($request->get('date')) {
            $data['date'] = Carbon::parse($data['date']);
        }

        return $data;
    }

}
