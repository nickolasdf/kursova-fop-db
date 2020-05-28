<?php

use App\Models\Enum;
use App\Models\Project;
use App\Models\UserEmployee;
use App\Models\UserProfile;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreateUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();
        DB::statement('ALTER TABLE users AUTO_INCREMENT = 1');


        $admin = factory(User::class)->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
        ]);
        $admin->assignRole(['admin']);
    }
}
