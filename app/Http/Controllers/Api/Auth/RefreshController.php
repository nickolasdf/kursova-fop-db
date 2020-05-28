<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Requests\Api\Auth\RefreshRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RefreshController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(RefreshRequest $request)
    {
        if (!$client = DB::table('oauth_clients')->find(env('OAUTH_CLIENT_ID',2))) {
            return response()->json([
                'message' => 'Not initials oauth client.',
                'errors' => 'Unrefreshed'
            ], 422);
        }

        /*
         * як порівняти хешовані токени
        $token = DB::table('oauth_refresh_tokens')->whereId(Hash::make($request->token))->first();
        if (Carbon::now() > $token->expires_at) {
            DB::table('oauth_access_tokens')->whereId($token->access_token_id)->update(['revoked' => 1]);
        }
        */
        $data = [
            'grant_type' => 'refresh_token',
            'refresh_token' => $request->token,
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'scope' => '',
        ];
        $postRequest = Request::create(url('/oauth/token'), 'POST', $data);
        $response = app()->handle($postRequest);
        if ($response->getStatusCode() != 200) {
            return response()->json([
                $response,
                'message' => 'You cannot sign with those credentials.',
                'errors' => 'Unrefreshed'
            ], 422);
        }
        $data = json_decode($response->getContent());

        return response()->json($data);
    }
}
