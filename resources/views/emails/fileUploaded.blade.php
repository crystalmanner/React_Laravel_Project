@extends('layouts.mail')

@section('content')
    <table style="min-width:290px;margin:0 auto;" align="center">
        <tr>
            <td align="center">
                <a href="{{ url('/') }}">
                    <img src="cid:logoimg" />
                </a>
            </td>
        </tr>
        <tr>
            <td>
                <table style="min-width:290px; border: 1px solid #E5E5E5; border-collapse: collapse; margin-top:10px;">
                    <tr style="background-color:#fff">
                        <td style="padding:32px 0;">
                            <table width="100%">
                                <tr>
                                    <td style="color:#999;font-size:14px;padding:10px;">Dear,<br/>
                                        Thanks for using <b>{{ config('app.name') }}</b>. <br/>
                                        The file(s) have been sent to the recipients.<br/>
                                        It will be destroyed after <b>{{ $expire_time }}</b>.
                                    </td>
                                </tr>
                                <tr align="center">
                                    <center>
                                        <a href="{{ url('/'.$upload_id) }}">Download File(s)</a>
                                    </center>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr style="font-size:13px;">
                        <td style="background-color:#f6f6f6;padding: 20px;">
                            <b>Receivers:</b><br/>{{ $receivers }}
                            <p>
                                <b>File(s) Name:</b><br/>
                                {{ $file_names }}
                            </p>
                            <p>
                                <b>File(s) Size:</b><br/>
                                {{ $size }} MB - {{ $total_files }} file(s)
                            </p>
                            <p>
                                <b>Your Message:</b><br/>
                                {{--{{ $message }}--}}
                            </p>
                            Best regards,<br/>
                            <b>{{ config('app.name') }}</b>
                            <center>
                                <a href="{{ url('/'.$upload_id) }}">Download File(s)</a>
                            </center>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
@endsection