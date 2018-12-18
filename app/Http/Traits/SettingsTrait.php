<?php

namespace App\Http\Traits;

use App\Setting;

trait SettingsTrait
{
    /**
     * @return array
     */
    public function getSettings()
    {
        $settings = Setting::first();
        return isset($settings) ? $settings->toArray() : [];
    }

    /**
     * Set additional properties to data
     *
     * @param $data
     * @param $settings
     * @param $request
     */
    public function setData(&$data, $settings, $request){
        $data['name_on_file'] = 'sendgb';
        $data['time_expire'] =  time() + $settings['expire'];
        $data['our_site_url'] = "http://" . $settings['site_url'];
        $data['our_short_url']  = 'http://sgb.so/';
        $data['upload_server'] =  "SendGB S1";
        $data['upload_language'] =  "en";
        $data['ip'] = $request->ip();
        $data['message_receiver'] = __('messages.message_receiver');
        $data['receiver_subject'] = __('messages.receiver_subject');
        $data['settings'] = $settings;
        $data['upload_dir'] = "uploads";
        $data['chunks_dir'] = "chunks";
        $data['upload_id'] = $request->get('id');
    }
}