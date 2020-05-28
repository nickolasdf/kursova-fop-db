<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\ResetPasswordDataRequest;
use App\Http\Requests\Api\Auth\ResetPasswordRequest;
use App\Mail\ResetPasswordEmail;
use App\Models\PasswordReset;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ResetPasswordController extends Controller
{
    /**
     * Password reset model object
     *
     * @var PasswordReset
     */
    protected $passwordReset;

    public function __construct(PasswordReset $passReset) {
        $this->passwordReset = $passReset;
    }

    /**
     * Method for getting link for reset password
     *
     * @param ResetPasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function getToken(ResetPasswordRequest $request) {
        if(!$passwordReset = $this->passwordReset->whereEmail($request->email)->first()) {
            $this->makeToken($request->email);
            return response()->json(['message' => 'Link for reset password was sent successfully']);
        }

        $tokenCreatedAt = new Carbon($passwordReset->created_at);
        if($tokenCreatedAt->diffInMinutes(now()) >= 5) {
            $this->destroyToken($passwordReset);
            $this->makeToken($request->email);
            return response()->json(['message' => 'Link for reset password was sent successfully again']);
        }

        return response()->json(['message' => 'Check your email, link for reset already sent']);
    }

    /**
     * Reset password method
     *
     * @param ResetPasswordDataRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function reset(ResetPasswordDataRequest $request) {
        $passwordReset = $this->passwordReset->whereToken($request->token)->first();

        if(!$passwordReset) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $user = User::where('email', $passwordReset->email)->firstOrFail();
        $this->destroyToken($passwordReset);
        $result = $user->update(['password' => $request->password]);

        $message = $result ? 'Password was reset successfully' : 'Problem in password resetting';
        return response()->json(['message' => $message]);
    }

    /**
     * Method for deleting token
     *
     * @param PasswordReset $passwordReset
     * @return bool
     */
    protected function destroyToken(PasswordReset $passwordReset) {
        try {
            $passwordReset->delete();
        } catch (\Exception $e) {
            Log::error('Problem in reset password token deleting', ['exception' => $e]);
            return false;
        }

        return true;
    }

    /**
     * Generate, save and send token
     *
     * @param $email
     * @return string
     */
    protected function makeToken(string $email) {
        $token = Hash::make($this->getStringForHashing($email));

        $result = $this->passwordReset->create([
            'email' => $email,
            'token' => $token,
        ]);

        if($result) {
            Mail::to($email)->send(new ResetPasswordEmail($token));
            return $token;
        }

        return null;
    }

    /**
     * Method for preparing string before hashing
     *
     * @param string $email
     * @return string
     */
    private function getStringForHashing(string $email) {
        return config('app.name').$email.now();
    }
}
