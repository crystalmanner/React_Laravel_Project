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
                                    <td style="color:#999;font-size:14px;padding:10px;">Hey,<br/>Your file(s) have been destroyed,<br/>
                                        thanks for using {site_name} and don`t hesitate to use it again !,<br/>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr style="font-size:13px;">
                        <td style="background-color:#f6f6f6;padding: 20px;">
                            <p>
                                <b>Downloaded by:</b><br/>
                                {download_email}
                            </p>
                            <p>
                                <b>File(s) Size:</b><br/>
                                {size} MB - {total_files} file(s)
                            </p>
                            <p>
                                <b>Your Message:</b><br/>
                                {message}
                            </p>
                            Best regards,<br/><b>{site_name}</b>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
@endsection