<?php

namespace App\Http\Requests\Api\Fop;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class FopUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'fop' => ['numeric', 'exists:fops,id'],
            'name' => ['required', 'string', 'max:3000'],
            'address' => ['required', 'string', 'max:3000'],
            'activities' => ['required', 'array'],
            'registrationNumber' => ['required', 'string', 'max:3000'],
            'registerLocation' => ['required', 'string', 'max:3000'],
            'registrationDate' => ['required', 'string', 'max:3000'],
            'phone' => ['required', 'string', 'max:3000'],
            'email' => ['required', 'email', 'max:3000'],
            'taxNumber' => ['required', 'string', 'max:3000'],
        ];
    }

    /**
     * Get data to be validated from the request.
     *
     * @return array
     */
    public function validationData()
    {
        return array_merge($this->route()->parameters(), $this->all());
    }

    /**
     * @param Validator $validator
     */
    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json($validator->errors(),422));
    }
}
