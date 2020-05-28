<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\FopFilter;
use App\Http\Requests\Api\Fop\FopAddIncomeRequest;
use App\Http\Requests\Api\Fop\FopCreateRequest;
use App\Http\Requests\Api\Fop\FopDataRequest;
use App\Http\Requests\Api\Fop\FopRequest;
use App\Http\Requests\Api\Fop\FopUpdateRequest;
use App\Http\Resources\FopResource;
use App\Models\Fop;
use App\Models\Tax;
use App\Traits\HelperData;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FopController extends Controller
{
    use HelperData;

    public function index(FopDataRequest $request, FopFilter $filter)
    {
        $fops = Fop::with(['_fop_incomes', '_fop_taxes'])
            ->sorting($request)
            ->search($request)
            ->filter($filter)
            ->paginate($request->get('per_page', Fop::Paginate_PerPage));

        return FopResource::collection($fops);
    }

    public function store(FopCreateRequest $request)
    {
        try {
            $data = $this->prepareData($request);
            $fop = Fop::create($data);
            $response = ['result' => true, 'message' => 'FOP created successfully.', 'data' => new FopResource($fop)];
            $status = 200;

        } catch (\Exception $e){

            Log::error('Exception in FOP created: ', ['exception' => $e]);
            $response = ['result' => false, 'message' => 'Problems in FOP created.'];
            $status = 409;
        }

        return response()->json($response)->setStatusCode($status);
    }

    public function show(FopRequest $request, $id)
    {
        $fop = Fop::find($id);

        return new FopResource($fop);
    }

    public function update(FopUpdateRequest $request, $id)
    {
        try{
            $data = $this->prepareData($request);
            Fop::whereId($id)->update($data);
            $response = ['result' => true, 'message' => 'FOP update successfully.'];
            $status = 200;

        } catch (\Exception $e){

            Log::error('Exception in FOP update: ', ['exception' => $e]);
            $response = ['result' => false, 'message' => 'Problems in FOP update.'];
            $status = 409;
        }

        return response()->json($response)->setStatusCode($status);
    }

    public function delete(FopRequest $request, $id)
    {
        try {
            Fop::whereId($id)->delete();
            $response = ['result' => true, 'message' => 'FOP delete successfully.'];
            $status = 200;

        } catch (\Exception $e) {
            Log::error('Exception in FOP delete: ', ['exception' => $e]);
            $response = ['result' => false, 'message' => 'Problems in FOP delete.'];
            $status = 409;
        }

        return response()->json($response)->setStatusCode($status);
    }

    public function addIncome(FopAddIncomeRequest $request, $id)
    {
        DB::beginTransaction();
        try{
            $data = $this->prepareData($request);
            $fop = Fop::find($id);
            $income = $fop->_fop_incomes()->create($data);

            $taxes = Tax::get();
            $createData = [];
            foreach ($taxes as $tax) {
                $createData[] = [
                    'fop_income_id' => $income->getId(),
                    'tax_id' => $tax->getId(),
                    'total' => $income->total * $tax->percent / 100,
                    'date' => $income->date,
                ];
            }
            if (!empty($createData)) {
                $fop->_fop_taxes()->createMany($createData);
            }

            $response = ['result' => true, 'message' => 'FOP INCOME fields access update successfully.'];
            $status = 200;
            DB::commit();

        } catch (\Exception $e){

            DB::rollBack();
            Log::error('Exception in FOP INCOME fields access update: ', ['exception' => $e]);
            $response = ['result' => false, 'message' => 'Problems in FOP INCOME fields access update.'];
            $status = 409;
        }

        return response()->json($response)->setStatusCode($status);
    }

}
