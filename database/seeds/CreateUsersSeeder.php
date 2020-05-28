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
        DB::table('user_profile')->delete();
        DB::statement('ALTER TABLE user_profile AUTO_INCREMENT = 1');
        DB::table('user_employee')->delete();
        DB::statement('ALTER TABLE user_employee AUTO_INCREMENT = 1');
        DB::table('people_languages')->delete();
        DB::statement('ALTER TABLE people_languages AUTO_INCREMENT = 1');
        DB::table('people_skills')->delete();
        DB::statement('ALTER TABLE people_skills AUTO_INCREMENT = 1');
        DB::table('comments')->delete();
        DB::statement('ALTER TABLE comments AUTO_INCREMENT = 1');
        DB::table('users')->delete();
        DB::statement('ALTER TABLE users AUTO_INCREMENT = 1');

        $projects = Project::get();

        $admin = factory(User::class)->create([
            'first_name' => 'Admin',
            'last_name' => 'Rivo',
            'email' => 'admin@rivo.com',
        ]);
        $admin->assignRole([User::RoleADMIN]);

        $admin = factory(User::class)->create([
            'first_name' => 'Accountant',
            'last_name' => 'Rivo',
            'email' => 'accountant@rivo.com',
        ]);
        $admin->assignRole([User::RoleACCOUNTANT]);

        $hr = factory(User::class)->create([
            'first_name' => 'Hr',
            'last_name' => 'Rivo',
            'email' => 'hr@rivo.com',
        ]);
        $hr->assignRole([User::RoleHR]);

        $employee = factory(User::class)->create([
            'first_name' => 'Employee',
            'last_name' => 'Rivo',
            'email' => 'employee@rivo.com',
        ]);
        $employee->assignRole([User::RoleEMPLOYEE]);

        factory(User::class, 10)->create();

        $enums = Enum::get();
        $currencies = $enums->where('type', Enum::TYPE_Currency);
        $users = User::get();

        foreach($users as $user) {
            $user->_profile()->save(factory(UserProfile::class)->make());
            $user->_employee()->save(factory(UserEmployee::class)->make());
            $data = [];
            foreach ($currencies as $currency) {
                $accountName = Enum::ACCOUNT_NAMES[rand(0,1)];
                array_push($data, [
                    'currency_id' => $currency->getId(),
                    'name' => $accountName,
                    'total' => rand(1, 1000.00)
                ]);
            };
            $user->_accounts()->createMany($data);
            $user->_projects()->attach($projects->random(rand(1,4))->pluck('id')->toArray());
            $arrayIds = [];
            $id = 0;
            for($i=0;$i<rand(2,3);$i++) {
                do {
                    array_push($arrayIds, $id);
                    $id = $enums->where('type', Enum::TYPE_Language)->random()->getId();
                } while(in_array($id, $arrayIds));
                $user->_languages()->attach([[
                    'language_id' => $id,
                    'language_level_id' => $enums->where('type', Enum::TYPE_LanguageLevel)->random()->getId(),
                ]]);
            }
            $arrayIds = [];
            $id = 0;
            for($i=0;$i<rand(5,8);$i++) {
                do {
                    array_push($arrayIds, $id);
                    $id = $enums->where('type', Enum::TYPE_Skill)->random()->getId();
                } while(in_array($id, $arrayIds));
                $user->_skills()->attach([[
                    'skill_id' => $id,
                    'skill_level_id' => $enums->where('type', Enum::TYPE_SkillLevel)->random()->getId(),
                ]]);
            }
            for($i=0;$i<rand(6,10);$i++) {
                $user->_comments()->create([
                    'owner_id' => $users->random()->id,
                    'comment' => Str::random(rand(50,100)),
                ]);
            }
        }
    }
}
