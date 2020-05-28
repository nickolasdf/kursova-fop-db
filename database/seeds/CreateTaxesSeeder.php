<?php

use App\Models\Tax;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CreateTaxesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('taxes')->delete();
        DB::statement('ALTER TABLE taxes AUTO_INCREMENT = 1');

        Tax::create(['id' => 1, 'title' => 'ПДВ', 'percent' => '5']);
        Tax::create(['id' => 2, 'title' => 'ЄСВ', 'percent' => '10']);
        Tax::create(['id' => 3, 'title' => 'ПЗ (просто здирство)', 'percent' => '20']);

    }
}
