<?php

namespace App\Http\Controllers;

use App\Events\MessageSent as EventsMessageSent;
use Illuminate\Http\Request;
use Appp\Events\MessageSent ;
class VideoControll extends Controller
{
    //
    function createEvcent(){
        event(new EventsMessageSent(roomId:'1',message:''));
    }
    public function joinRoom(Request $request)
    {
        $roomId = $request->input('roomId');

        // تحقق من وجود الغرفة (يمكنك إضافة قاعدة بيانات للتحقق)
        if (!$roomId) {
            return response()->json(['error' => 'Room ID not provided'], 400);
        }

        return response()->json(['message' => 'Joined room successfully']);
    }
    public function createRoom()
    {
        $roomId = uniqid(); // إنشاء معرف غرفة فريد
        return response()->json(['roomId' => $roomId]);
    }
}
