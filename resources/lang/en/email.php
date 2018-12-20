<?php
return [
    'destroyed_subject' => "Your items have been destroyed !",
    'message_destruct' => '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html xmlns=3D"http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3DISO-8859-9" />
</head>
<body style="background-color:#eeeeee;font-size: 16px;font-family: Arial, Helvetica, sans-serif;padding:45px 0;">
    <table style="min-width:290px;max-width:390px;margin:0 auto;" align="center">
        <tr><td align="center"><a href="https://www.sendgb.com"><img src="cid:logoimg" /></a></td></tr>
        <tr>
            <td>
                <table style="min-width:290px;max-width:390px;width:390px; border: 1px solid #E5E5E5; border-collapse: collapse; margin-top:10px;">
                    <tr style="background-color:#fff">
                        <td style="padding:32px 0;">
                            <table width="100%">
                                <tr>
																	<td style="color:#999;font-size:14px;padding:10px;">Hey,<br/>
Your file(s) have been destroyed,<br/> 
thanks for using {site_name} and don`t hesitate to use it again !,<br/>
																	</td>
																</tr>
                    						<!--<tr><td style="color:#999;font-size:16px"></td></tr>-->
						                <!--<tr><td style="font-size:15px;max-width:290px" align="center"></td></tr>-->
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
                                <b>Sending Date:</b><br/>
                                {time}
                            </p>							
                            <p>
                                <b>Receivers:</b><br/>
                                {receivers}
                            </p>								
                            <p>
                                <b>Your Message:</b><br/>
                                {message}
                            </p>		

														Best regards,<br/>
														<b>{site_name}</b>

                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
    <br />
    <center style="font-size:11px;color:#999;"><a href="https://www.sendgb.com" target="_blank" style="text-decoration:none;">sendgb.com</a> - Free, fast and easy file upload & share !</center>
<br />
<center style="font-size:11px;color:#999;">
Please support us on Facebook and Twitter !
<br />
<a href="https://www.facebook.com/sendgb" target="_blank" style="text-decoration:none;">Facebook</a> - <a href="https://twitter.com/sendgb" target="_blank" style="text-decoration:none;">Twitter</a>
<br />
</center>
</body>
</html>',
    'destroyed_subject2' => 'Your items have been destroyed !',
    'message_destruct2' => '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html xmlns=3D"http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3DISO-8859-9" />
</head>
<body style="background-color:#eeeeee;font-size: 16px;font-family: Arial, Helvetica, sans-serif;padding:45px 0;">
    <table style="min-width:290px;max-width:390px;margin:0 auto;" align="center">
        <tr><td align="center"><a href="https://www.sendgb.com"><img src="cid:logoimg" /></a></td></tr>
        <tr>
            <td>
                <table style="min-width:290px;max-width:390px;width:390px; border: 1px solid #E5E5E5; border-collapse: collapse; margin-top:10px;">
                    <tr style="background-color:#fff">
                        <td style="padding:32px 0;">
                            <table width="100%">
                                <tr>
																	<td style="color:#999;font-size:14px;padding:10px;">Hey,<br/>
Your file(s) have been destroyed,<br/> 
thanks for using {site_name} and don`t hesitate to use it again !,<br/>
																	</td>
																</tr>
                    						<!--<tr><td style="color:#999;font-size:16px"></td></tr>-->
						                <!--<tr><td style="font-size:15px;max-width:290px" align="center"></td></tr>-->
                            </table>
                        </td>
                    </tr>

                    <tr style="font-size:13px;">
                        <td style="background-color:#f6f6f6;padding: 20px;">
                            <p>
                                <b>File(s) Size:</b><br/>
                                {size} MB - {total_files} file(s)
                            </p>		
                            <p>
                                <b>Sending Date:</b><br/>
                                {time}
                            </p>							
                            <p>
                                <b>Receivers:</b><br/>
                                {receivers}
                            </p>								
                            <p>
                                <b>Your Message:</b><br/>
                                {message}
                            </p>	
														Best regards,<br/>
														<b>{site_name}</b>

                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
    <br />
    <center style="font-size:11px;color:#999;"><a href="https://www.sendgb.com" target="_blank" style="text-decoration:none;">sendgb.com</a> - Free, fast and easy file upload & share !</center>
<br />
<center style="font-size:11px;color:#999;">
Please support us on Facebook and Twitter !
<br />
<a href="https://www.facebook.com/sendgb" target="_blank" style="text-decoration:none;">Facebook</a> - <a href="https://twitter.com/sendgb" target="_blank" style="text-decoration:none;">Twitter</a>
<br />
</center>
</body>
</html>',
    'sender_subject' => "Thanks for using {site_name}. File(s) has been sent {emails_to_count} user(s)",
    'message_sender' => '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html xmlns=3D"http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3DISO-8859-9" />
</head>
<body style="background-color:#eeeeee;font-size: 16px;font-family: Arial, Helvetica, sans-serif;padding:45px 0;">
    <table style="min-width:290px;max-width:390px;margin:0 auto;" align="center">
        <tr><td align="center"><a href="https://www.sendgb.com"><img src="cid:logoimg" /></a></td></tr>
        <tr>
            <td>
                <table style="min-width:290px;max-width:390px;width:390px; border: 1px solid #E5E5E5; border-collapse: collapse; margin-top:10px;">
                    <tr style="background-color:#fff">
                        <td style="padding:32px 0;">
                            <table width="100%">
                                <tr>
																	<td style="color:#999;font-size:14px;padding:10px;">Dear,<br/>
																	Thanks for using <b>{site_name}</b>. <br/>
																	The file(s) have been sent to the recipients.<br/>
																	It will be destroyed after <b>{expire_time}</b>.
																	</td>
																</tr>
                    						<!--<tr><td style="color:#999;font-size:16px"></td></tr>-->
						                <!--<tr><td style="font-size:15px;max-width:290px" align="center"></td></tr>-->
                            </table>
                        </td>
                    </tr>

                    <tr style="font-size:13px;">
                        <td style="background-color:#f6f6f6;padding: 20px;">
                            <b>Receivers:</b><br/>
                                {emails_to_SGB}

                            <p>
                                <b>Password:</b><br/>
                                {password}
                            </p>	
                            <p>
                                <b>Your Message:</b><br/>
                                {message}
                            </p>	
                            <p>
                                <b>Destructed at:</b><br/>
                                {time_expire}
                            </p>								
                            <p>
                                <b>File(s) Size:</b><br/>
                                {size} MB - {total_files} file(s)
                            </p>	
                            <p>
                                <b>File(s) Name:</b><br/>
                                {file_names}
                            </p>
														Best regards,<br/>
														<b>{site_name}</b>

							<br><br>																			
                            <center>
																		<table>
																			<tr>
																				<td style="background-color: #f1592a;border-color: #f1592a;border: 2px solid #f1592a;padding: 10px;text-align: center;">
																					<a href="{download_url}" target="_blank" style="display:block;margin:0; font-size:15px;color:#ffffff; text-decoration:none;">Download File(s)</a>
																				</td>
																			</tr>
																		</table>								
														</center>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
    <br />
    <center style="font-size:11px;color:#999;"><a href="https://www.sendgb.com" target="_blank" style="text-decoration:none;">sendgb.com</a> - Free, fast and easy file upload & share !</center>
<br />
<center style="font-size:11px;color:#999;">
Please support us on Facebook and Twitter !
<br />
<a href="https://www.facebook.com/sendgb" target="_blank" style="text-decoration:none;">Facebook</a> - <a href="https://twitter.com/sendgb" target="_blank" style="text-decoration:none;">Twitter</a>
<br />
</center>
</body>
</html>',
    'receiver_subject' => '{email_from} sent file(s) via {site_name}',
    'message_receiver' => '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html xmlns=3D"http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3DISO-8859-9" />
</head>
<body style="background-color:#eeeeee;font-size: 16px;font-family: Arial, Helvetica, sans-serif;padding:45px 0;">
    <table style="min-width:290px;max-width:390px;margin:0 auto;" align="center">
        <tr><td align="center"><a href="https://www.sendgb.com"><img src="cid:logoimg" /></a></td></tr>
        <tr>
            <td>
                <table style="min-width:290px;max-width:390px;width:390px; border: 1px solid #E5E5E5; border-collapse: collapse; margin-top:10px;">
                    <tr style="background-color:#fff">
                        <td style="padding:32px 0;">
                            <table width="100%">
                                <tr>
																	<td style="color:#999;font-size:14px;padding:10px;">Hey,<br/>
																	You have received some file(s) from <a href="mailto:{email_from}" style="color: #363636;"><b>{email_from}</b></a><br/> 
																	with a total size of <b>{size} MB</b>.<br/>
																	The file(s) will be destroyed after <b>{expire_time}</b>.
																	</td>
																</tr>
																<tr align="center">
																	<td>
																		<table>
																			<tr>
																				<td style="background-color: #f1592a;border-color: #f1592a;border: 2px solid #f1592a;padding: 10px;text-align: center;">
																					<a href="{download_url}" target="_blank" style="display:block;margin:0; font-size:15px;color:#ffffff; text-decoration:none;">Download File(s)</a>
																				</td>
																			</tr>
																		</table>																									
																	</td>																
																</tr>																	
                    						<!--<tr><td style="color:#999;font-size:16px"></td></tr>-->
						                <!--<tr><td style="font-size:15px;max-width:290px" align="center"></td></tr>-->
                            </table>
                        </td>
                    </tr>

                    <tr style="font-size:13px;">
                        <td style="background-color:#f6f6f6;padding: 20px;">
                            <b>Sender Email:</b><br />
                                {email_from}<br />

                            <p>
                                <b>Password:</b><br/>
                                {password}
                            </p>							
                            <p>
                                <b>Your Message:</b><br/>
                                {message}
                            </p>	
                            <p>
                                <b>Destructed at:</b><br/>
                                {time_expire}
                            </p>							
                            <p>
                                <b>File(s) Size:</b><br/>
                                {size} MB - {total_files} file(s)
                            </p>	
                            <p>
                                <b>File(s) Name:</b><br/>
                                {file_names}
                            </p>
														Best regards,<br/>
														<b>{site_name}</b>

							<br><br>																			
                            <center>
																		<table>
																			<tr>
																				<td style="background-color: #f1592a;border-color: #f1592a;border: 2px solid #f1592a;padding: 10px;text-align: center;">
																					<a href="{download_url}" target="_blank" style="display:block;margin:0; font-size:15px;color:#ffffff; text-decoration:none;">Download File(s)</a>
																				</td>
																			</tr>
																		</table>							
														</center>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
    <br />
    <center style="font-size:11px;color:#999;"><a href="https://www.sendgb.com" target="_blank" style="text-decoration:none;">sendgb.com</a><br>Free, fast and easy file upload & share !<br><br>Please do not reply to this email. You can write to the following e-mail address to contact us.<br><br>info@sendgb.com</center>
<br />
<center style="font-size:11px;color:#999;">
Please support us on Facebook and Twitter !
<br />
<a href="https://www.facebook.com/sendgb" target="_blank" style="text-decoration:none;">Facebook</a> - <a href="https://twitter.com/sendgb" target="_blank" style="text-decoration:none;">Twitter</a>
<br />
</center>
</body>
</html>',
    'downloaded_subject' => "File(s) has been downloaded which you sent via {site_name} ",
    'message_downloaded' => '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html xmlns=3D"http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3DISO-8859-9" />
</head>
<body style="background-color:#eeeeee;font-size: 16px;font-family: Arial, Helvetica, sans-serif;padding:45px 0;">
    <table style="min-width:290px;max-width:390px;margin:0 auto;" align="center">
        <tr><td align="center"><a href="https://www.sendgb.com"><img src="cid:logoimg" /></a></td></tr>
        <tr>
            <td>
                <table style="min-width:290px;max-width:390px;width:390px; border: 1px solid #E5E5E5; border-collapse: collapse; margin-top:10px;">
                    <tr style="background-color:#fff">
                        <td style="padding:32px 0;">
                            <table width="100%">
                                <tr>
																	<td style="color:#999;font-size:14px;padding:10px;">Hey,<br/>
File(s) has been downloaded which you sent via <b>{site_name}</b> <br/> 
																	</td>
																</tr>
                    						<!--<tr><td style="color:#999;font-size:16px"></td></tr>-->
						                <!--<tr><td style="font-size:15px;max-width:290px" align="center"></td></tr>-->
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
                                <a href="{download_url}" target="_blank" style="text-decoration:none;">{download_short_url}</a>
                            </p>		

														Best regards,<br/>
														<b>{site_name}</b>

                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
    <br />
    <center style="font-size:11px;color:#999;"><a href="https://www.sendgb.com" target="_blank" style="text-decoration:none;">sendgb.com</a> - Free, fast and easy file upload & share !</center>
<br />
<center style="font-size:11px;color:#999;">
Please support us on Facebook and Twitter !
<br />
<a href="https://www.facebook.com/sendgb" target="_blank" style="text-decoration:none;">Facebook</a> - <a href="https://twitter.com/sendgb" target="_blank" style="text-decoration:none;">Twitter</a>
<br />
</center>
</body>
</html>'

];
