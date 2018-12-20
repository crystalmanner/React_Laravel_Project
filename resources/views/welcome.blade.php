<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google" content="notranslate" />
    <meta name="description" content="Free and fast file sharing. Send large files easily. No needed registration. We transfer files up to 4GB. File upload with great functions. Mail big file now!">
    <meta name="Keywords" content="File sharing, free, big file sharing, sendGB, transfer, Movie, File, documents, Transfer, large, Send, Files, file, big, Illustration, photography, media, digital, design, we transfer, big files">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta name="author" content="SendGB">
    <meta property="og:description" content="Free and fast file sharing. Send large files easily. No needed registration. We transfer files up to 4GB. File upload with great functions. Mail big file now!">
    <meta property="og:title" content="SendGB | Send Large Files | Free file sharing">
    <meta property="og:image" content="http://www.sendgb.com/og-logo.jpg">
    <meta property="og:image:secure_url" content="https://www.sendgb.com/og-logo.jpg">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="400">
    <meta property="og:image:height" content="400">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@sendgb">
    <meta name="twitter:title" content="SendGB | Send Large Files | Free file sharing">
    <meta name="twitter:description" content="Free and fast file sharing. Send large files easily. No needed registration. We transfer files up to 4GB. File upload with great functions. Mail big file now!">
    <meta name="twitter:image" content="https://www.sendgb.com/img/share/sendgb.jpg">
    <meta name="pinterest" content="nopin">
    <meta name="application-name" content="SendGB">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/sgb-windows8.png">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!--
    manifest.json provides metadata used when your web app is added to the
    homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="manifest" href="{{public_path('manifest.json')}}">
    <link rel="shortcut icon" href="https://www.sendgb.com/favicon.png">
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
</head>
<body>
<noscript>
    You need to enable JavaScript to run this app.
</noscript>
<div id="root"></div>

<script src="{{mix('js/app.js')}}"></script>
</body>
</html>