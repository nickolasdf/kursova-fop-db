<?php

use App\User;
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

        Role::create(['id' => User::RoleADMINID, 'name' => User::RoleADMIN, 'guard_name' => 'api']);
        Role::create(['id' => User::RoleHRID, 'name' => User::RoleHR, 'guard_name' => 'api']);
        Role::create(['id' => User::RoleEMPLOYEEID, 'name' => User::RoleEMPLOYEE, 'guard_name' => 'api']);
        Role::create(['id' => User::RoleACCOUNTANTID, 'name' => User::RoleACCOUNTANT, 'guard_name' => 'api']);
    }
}
