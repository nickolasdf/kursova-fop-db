<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\UserRequest;
use App\Http\Requests\Api\User\UsersRequest;
use App\Http\Requests\Api\User\UserUpdateRequest;
use App\Traits\HelperData;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    use HelperData;

    public function index()
    {
        $data = User::get();

        return User::collection($data);
    }


    public function show(UserRequest $request, $userId)
    {
        $user = User::find($userId);

        return new User($user);
    }

    public function update(UserUpdateRequest $request, $userId)
    {
        DB::beginTransaction();
        try{
            $user = User::find($userId);
            $data = $this->prepareData($request);
            $user->update($data);
            $response = ['result' => true, 'message' => 'User update successfully.'];
            $status = 200;

        } catch (\Exception $e){
            DB::rollBack();
            Log::error('Exception in User update: ', ['exception' => $e]);
            $response = ['result' => false, 'message' => 'Problems in update User.'];
            $status = 409;
        }
        DB::commit();

        return response()->json($response)->setStatusCode($status);
    }

    public function delete(UserRequest $request, $userId)
    {
        try {
            User::whereId($userId)->delete();
            $response = ['result' => true, 'message' => 'User delete successfully.'];
            $status = 200;

        } catch (\Exception $e) {
            Log::error('Exception in User delete: ', ['exception' => $e]);
            $response = ['result' => false, 'message' => 'Problems in User delete.'];
            $status = 409;
        }

        return response()->json($response)->setStatusCode($status);
    }

    public function deleteMany(UsersRequest $request)
    {
        try {
            User::whereIn('id', $request->all())->delete();
            $response = ['status' => 'success', 'message' => 'User was deleted'];
            $status = 200;

        } catch (\Exception $e) {
            Log::error('Exception in User deleting', ['exception' => $e]);
            $response = ['status' => 'error', 'message' => 'Problems in User deleting'];
            $status = 409;
        }

        return response()->json($response)->setStatusCode($status);
    }

}
