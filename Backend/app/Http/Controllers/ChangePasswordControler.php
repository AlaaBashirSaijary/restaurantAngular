<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB; // إضافة هذا السطر لاستيراد واجهة DB
use App\Models\User;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ChangePasswordControler extends Controller
{
    public function resetPassword(ChangePasswordRequest $request){
        $resetRow = $this->getPasswordResetTableRow($request);
        return $resetRow?$this->chanePassword($request):$this->TokenNotoundResponce();
    }
    private function chanePassword($request){
        $user=User::whereEmail($request->email)->first();
        $user->update(['password'=> $request->password]);
        $this->getPasswordResetTableRow($request)->delete();
        return response()->json(['data'=>'Successfully Chanege Password'],Response::HTTP_CREATED);
    }
    private function TokenNotoundResponce(){
        return response()->json(['error'=>'Token or Email is not Found'],Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function getPasswordResetTableRow($request){

        return DB::table('password_reset_tokens')->where([
            'email'=>$request->email,
            'token'=>$request->token,
        ]) ->first();
    }
}
