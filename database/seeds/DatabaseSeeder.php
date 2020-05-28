<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CreateRolesSeeder::class);
        $this->call(CreateUsersSeeder::class);
        $this->call(CreateTaxesSeeder::class);
        $this->call(CreateFopsSeeder::class);

    }
}
