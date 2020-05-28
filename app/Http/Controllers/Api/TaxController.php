<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Tax\TaxCreateRequest;
use App\Http\Requests\Api\Tax\TaxRequest;
use App\Http\Requests\Api\Tax\TaxUpdateRequest;
use App\Http\Resources\TaxResource;
use App\Models\Tax;
use App\Traits\HelperData;
use Illuminate\Support\Facades\Log;

class TaxController extends Controller
{
    use HelperData;

    public function index()
    {
        $taxes = Tax::get();

        return TaxResource::collection($taxes);
    }

    public function store(TaxCreateRequest $request)
    {
        try {
            $data = $this->prepareData($request);
            $tax = Tax::create($data);
            $response = ['result' => true, 'message' => 'TAX created successfully.', 'data' => new TaxResource($tax)];
            $status = 200;

        } catch (\Exception $e){

            Log::error('Exception in TAX created: ', ['exception' => $e]);
            $response = ['result' => false, 'message' => 'Problems in TAX created.'];
            $status = 409;
        }

        return response()->json($response)->setStatusCode($status);
    }

    public function show(TaxRequest $request, $id)
    {
        $tax = Tax::find($id);

        return new TaxResource($tax);
    }

    public function update(TaxUpdateRequest $request, $id)
    {
        try{
            $data = $this->prepareData($request);
            Tax::whereId($id)->update($data);
            $response = ['result' => true, 'message' => 'TAX update successfully.'];
            $status = 200;

        } catch (\Exception $e){

            Log::error('Exception in TAX update: ', ['exception' => $e]);
            $response = ['result' => false, 'message' => 'Problems in TAX update.'];
            $status = 409;
        }

        return response()->json($response)->setStatusCode($status);
    }

    public function delete(TaxRequest $request, $id)
    {
        try {
            Tax::whereId($id)->delete();
            $response = ['result' => true, 'message' => 'TAX delete successfully.'];
            $status = 200;

        } catch (\Exception $e) {
            Log::error('Exception in TAX delete: ', ['exception' => $e]);
            $response = ['result' => false, 'message' => 'Problems in TAX delete.'];
            $status = 409;
        }

        return response()->json($response)->setStatusCode($status);
    }

}
