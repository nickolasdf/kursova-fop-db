<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\RegisterFormRequest;
use App\Mail\MailVerificationEmail;
use App\User;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param RegisterFormRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(RegisterFormRequest $request)
    {
        $user = User::create($request->only('first_name', 'last_name', 'email', 'password', 'middle_name', 'sex'));

        Mail::to($user->email)->queue(new MailVerificationEmail($user->generateVerifyToken()));

        return response()->json([
            'message' => 'You were successfully registered. Use your email and password to sign in.'
        ], 200);
    }
}
