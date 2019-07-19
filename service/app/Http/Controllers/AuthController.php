<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use JWTException;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function __construct (){
        $this->middleware('jwt.auth', ['except' => 'login']);    
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['username', 'password']);
        try {
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json([
                    'status' => false,
                    'message' =>"invalid credentials"
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'status' => false,
                'message' =>"could not create token"
            ], 500);
        }

        return response()->json([
            'status' => true,
            'response' => Auth::guard('api')->user(),
            'token' => $token,
            'message' =>"Login Success"
        ], 200);
    }

    public function logout(Request $request)
    {
        Auth::guard('api')->logout();
        return response()->json([
            'status' => true,
            'response' => Auth::guard('api')->user(),
            'message' =>"logout Success"
        ], 200);
    }

    public function check(Request $request)
    {
        return response()->json([
            'status' => true,
            'response' => Auth::guard('api')->user(),
            'message' =>"Check Success"
        ], 200);
    }
}
