<?php

namespace App\Console\Commands;

use App\Services\ExchangeRate\ExchangeRateService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class GetExchangeRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get:exchange_rates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get exchange rates.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     *
     * @param ExchangeRateService $rateService
     * @return mixed
     */
    public function handle(ExchangeRateService $rateService)
    {
        try {
            Log::info(date('Y-m-d H:m:s') . '. RUN cron GET EXCHANGE RATES');

            $rateService->cronGetExchangeRates();

            Log::info(date('Y-m-d H:m:s') . '. END cron GET EXCHANGE RATES');

        } catch (\Exception $e) {
            Log::error('Exception in get: ', ['exception' => $e]);
        }
    }

}
