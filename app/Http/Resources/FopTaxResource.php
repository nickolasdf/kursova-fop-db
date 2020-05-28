<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FopTaxResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' =>  $this->id,
            'fop_id' =>  $this->fop_id,
            'fop_income_id' =>  $this->fop_income_id,
            'tax_id' =>  $this->tax_id,
            'total' =>  $this->total,
            'date' =>  $this->date,

            'fop' => new FopResource($this->_fop),
            'fop_income' => new FopIncomeResource($this->_fop_income),
            'tax' => new TaxResource($this->_tax),
        ];
    }
}
