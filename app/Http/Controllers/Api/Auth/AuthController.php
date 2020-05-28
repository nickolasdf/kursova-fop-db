<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Resources\User as UserResource;
use App\Http\Controllers\Controller;
use Notification;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function me()
    {
        $user = request()->user();
        return new UserResource($user);
    }
}
