<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Requests\Api\Auth\LoginFormRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(LoginFormRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'You cannot sign with those credentials.',
                'errors' => 'Unauthorised'
            ], 401);
        }
        // dont use
        //DB::table('oauth_access_tokens')->where('user_id', $user->id)->update(['revoked' => 1]);

        if (!$client = DB::table('oauth_clients')->find(env('OAUTH_CLIENT_ID',2))) {
            return response()->json([
                'message' => 'Not initials oauth client.',
                'errors' => 'Unauthorised'
            ], 422);
        }

        $data = [
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'username' => $credentials['email'],
            'password' => $credentials['password'],
            'scope' => '',
        ];
        $postRequest = Request::create(url('/oauth/token'), 'POST', $data);
        $response = app()->handle($postRequest);
        if ($response->getStatusCode() != 200) {
            return response()->json([
                'message' => 'You cannot sign with those credentials.',
                'errors' => 'Unauthorised'
            ], 422);
        }
        $data = json_decode($response->getContent());

        return response()->json($data);
    }

}
