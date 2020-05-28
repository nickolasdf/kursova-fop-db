<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FopIncomeResource extends JsonResource
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
            'total' =>  $this->total,
            'date' =>  $this->date,

            'fop' => new FopResource($this->_fop),
        ];
    }
}
