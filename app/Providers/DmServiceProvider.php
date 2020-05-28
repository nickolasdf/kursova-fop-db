<?php

namespace App\Providers;

use App\DataManager\DataManager;
use Illuminate\Support\ServiceProvider;

class DmServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('DataManager', function ($app) {
            return new DataManager();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
