<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class CreateRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->delete();
        DB::statement('ALTER TABLE roles AUTO_INCREMENT = 1');

        Role::create(['id' => 1, 'name' => 'admin', 'guard_name' => 'api']);
        Role::create(['id' => 2, 'name' => 'user', 'guard_name' => 'api']);
    }
}
