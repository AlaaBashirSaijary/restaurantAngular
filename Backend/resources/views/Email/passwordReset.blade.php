<x-mail::message>
# Change Password Request

Click on the Button below to change password
<x-mail::button :url="'http://127.0.0.1:4200/responce-Password?token='.$token">
Reset Password
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
