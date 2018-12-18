<?php

namespace App\Helpers;

use App\Setting;

/**
 * Class SettingsHelper
 * @package App\Helpers
 */
class SettingsHelper
{
    /**
     * @return array
     */
    public function getSettings()
    {
        $settings = Setting::first();
        return isset($settings) ? $settings->toArray() : [];
    }
}