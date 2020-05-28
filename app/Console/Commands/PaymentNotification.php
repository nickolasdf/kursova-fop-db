<?php

namespace App\Console\Commands;

use App\Services\EmailService\EmailFactory;
use App\Services\NotifyService\Notify;
use App\Services\SmsService\SmsFactory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class PaymentNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hosting:payment_notify';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send payment notification';

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
     * @param Notify $notifyService
     * @return mixed
     */
    public function handle(Notify $notifyService)
    {
        try {
            Log::info(date('Y-m-d H:m:s') . '. RUN cron PAYMENT NOTIFICATION');

            $notifyService->cronPaymentNotify(new EmailFactory(), new SmsFactory());

            Log::info(date('Y-m-d H:m:s') . '. END cron PAYMENT NOTIFICATION');

        } catch (\Exception $e) {
            Log::error('Exception in get: ', ['exception' => $e]);
        }
    }

}
