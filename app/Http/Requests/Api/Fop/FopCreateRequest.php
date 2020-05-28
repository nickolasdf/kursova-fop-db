<?php

namespace App\Http\Requests\Api\Fop;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class FopCreateRequest extends FormRequest
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
     * @param Validator $validator
     */
    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json($validator->errors(),422));
    }
}
