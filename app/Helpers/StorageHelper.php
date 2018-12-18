<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class StorageHelper
{
    /**
     * Save file into storage
     * @param $disk
     * @param $file
     * @return bool|string
     */
    public static function saveFile($disk, $file, $name){
        #If $file is instance of an uploaded file
        if($file instanceof UploadedFile) {

            #Create a custom names
            $dirName = self::__createDir();

            #Store the file
            Storage::disk($disk)->putFileAs($dirName, $file, $name);

            return $dirName.DIRECTORY_SEPARATOR.$name;
        }
        #File not correct
        return false;
    }

    /**
     * Get file from storage folder based on name
     * @param $disk
     * @param $name
     * @return mixed
     */
    public static function getFile($disk, $name){
        $file = Storage::disk($disk)->get($name);
        return $file;
    }

    /**
     * Create a directory route
     * @return string
     * @internal param UploadedFile $file
     */
    private static function __createDir(){
        #Build DIRECTORY uri
        $name = date('Y') . DIRECTORY_SEPARATOR . date('m');

        return $name;
    }

    /**
     * Create a custom name so the it can be unique
     * @param UploadedFile $file
     * @return string
     */
    private static function __createName(UploadedFile $file) {
        return uniqid()."-".$file->getClientOriginalName();
    }

    public function getUrl($disk, $fileName){
//        return Storage::
    }
}