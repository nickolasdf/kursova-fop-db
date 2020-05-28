<?php

use App\Models\Fop;
use App\Models\Tax;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CreateFopsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('fops_taxes')->delete();
        DB::statement('ALTER TABLE fops_taxes AUTO_INCREMENT = 1');
        DB::table('fops_incomes')->delete();
        DB::statement('ALTER TABLE fops_incomes AUTO_INCREMENT = 1');
        DB::table('fops')->delete();
        DB::statement('ALTER TABLE fops AUTO_INCREMENT = 1');


        factory(Fop::class, 10)->create()->each(function ($fop) {
            for ($i=0;$i<rand(1,2);$i++) {
                $income = $fop->_fop_incomes()->create([
                    'total' => rand(1000,3000),
                    'date' => now(),
                ]);

                $taxes = Tax::get();
                $createData = [];
                foreach ($taxes as $tax) {
                    $createData[] = [
                        'fop_income_id' => $income->getId(),
                        'tax_id' => $tax->getId(),
                        'total' => $income->total * $tax->percent / 100,
                        'date' => $income->date,
                    ];
                }
                if (!empty($createData)) {
                    $fop->_fop_taxes()->createMany($createData);
                }
            }
        });
    }
}
