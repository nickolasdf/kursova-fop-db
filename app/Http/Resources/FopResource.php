<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FopResource extends JsonResource
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
            'name' =>  $this->name,
            'address' =>  $this->address,
            'activities' =>  $this->activities,
            'registrationNumber' =>  $this->registrationNumber,
            'registerLocation' =>  $this->registerLocation,
            'registrationDate' =>  $this->registrationDate,
            'phone' =>  $this->phone,
            'email' =>  $this->email,
            'taxNumber' =>  $this->taxNumber,

            'fop_incomes' => FopIncomeResource::collection($this->_fop_incomes),
            'fop_taxes' => FopTaxResource::collection($this->_fop_taxes),

        ];
    }
}
