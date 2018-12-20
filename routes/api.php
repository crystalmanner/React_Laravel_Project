<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('ajax','UploadController@ajax');
Route::post('download','UploadController@download');
Route::post('upload-chunks','UploadController@upload');
Route::options('upload-chunks','UploadController@options');

//ok
//{success: true, uploadName: "MAbpVFvd79W-sample.pdf", uuid: "6d2c94cd-e458-4a5f-9edc-1f2027c0bfcf"}
//{FileUploadedOk: "true", ShortUrlFid: "mkZrfN6", success: "true", upload_fid: "mkZrfN6", upload_id: "MAbpVFvd79W", upload_type: "mail"}


//Route::post('upload','UploadController@upload');
//Route::post('ajax','UploadController@ajax');
//Route::delete('ajax','UploadController@delete');
//Route::options('ajax','UploadController@options');

