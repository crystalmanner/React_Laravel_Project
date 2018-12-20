@extends('layouts.mail')

@section('content')
    <table style="min-width:290px;margin:0 auto;" align="center">
        <tr><td align="center"><a href="https://www.sendgb.com"><img src="cid:logoimg" /></a></td></tr>
        <tr>
            <td>
                <table style="min-width:290px; border: 1px solid #E5E5E5; border-collapse: collapse; margin-top:10px;">
                    <tr style="background-color:#fff">
                        <td style="padding:32px 0;">
                            <table width="100%">
                                <tr>
                                    <td style="color:#999;font-size:14px;padding:10px;">Hey,<br/>
                                        File(s) has been downloaded which you sent via <b>{site_name}</b> <br/>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr style="font-size:13px;">
                        <td style="background-color:#f6f6f6;padding: 20px;">
                            <b>Receiver Mail:</b><br/>
                            {download_email}
                            <p>
                                <b>File(s) Size:</b><br/>
                                {size} MB
                            </p>
                            <p>
                                <b>Your Message:</b><br/>
                                {message}
                            </p>
                            <p>
                                <b>Download Link:</b><br/>
                                <a href="https://www.sendgb.com/{upload_id}" target="_blank" style="text-decoration:none;">
                                    https://www.sendgb.com/{upload_id}
                                </a>
                            </p>
                            Best regards,<br/>
                            <b>{site_name}</b>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
@endsection
