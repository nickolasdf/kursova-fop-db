<?php

namespace App\Console\Commands;

use App\Services\Transaction\TransactionService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CreatePlannedTransactions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transaction:created_planned';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create planned transactions.';

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
     * @param TransactionService $transactionService
     * @return mixed
     */
    public function handle(TransactionService $transactionService)
    {
        try {
            Log::info(date('Y-m-d H:m:s') . '. RUN cron CREATE PLANNED TRANSACTIONS');

            $transactionService->cronCreatePlannedItems();

            Log::info(date('Y-m-d H:m:s') . '. END cron CREATE PLANNED TRANSACTIONS');

        } catch (\Exception $e) {
            Log::error('Exception in transaction created: ', ['exception' => $e]);
        }
    }

}
