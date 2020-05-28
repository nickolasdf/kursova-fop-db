<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FopTaxOnlyResource extends JsonResource
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
        ];
    }
}
