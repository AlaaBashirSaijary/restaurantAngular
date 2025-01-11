<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB; // إضافة هذا السطر لاستيراد واجهة DB

class ResetPasswordControler extends Controller
{
    public function sendEmail(Request $request){

        if(!$this->validateEmail($request->email)){
            return $this->failedResponse();
        }
        $this->send($request->email);
        return $this->successResponse();
    }
    public function send($email){
        $token=$this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }
    public function createToken($email){
   $token = Str::random(60);
   $this->SaveToken($token,$email);
    }
    public function SaveToken($token,$email){
        DB::table('password_reset_tokens')->updateOrInsert([
            'email'=>$email,
            'token' =>$token,
            'created_at'=>Carbon::now()
        ]);

    }
    public function successResponse(){
        return response()->json([
            'data'=>'Reset Email is send successfully,please check your inbox.'
        ],Response::HTTP_OK);
    }
    public function failedResponse(){
        return response()->json([
            'error'=>'Email doesn\'t found in Database'
        ],Response::HTTP_NOT_FOUND);
    }
    public function validateEmail($email){
        return !!User::where('email',$email)->first();
    }
}
