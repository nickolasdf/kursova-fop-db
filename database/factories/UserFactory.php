<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Enum;
use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'sex' => $faker->randomElement([ Enum::SexStatus_Man, Enum::SexStatus_Woman ]),
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => 'Qwerty1@',
        'remember_token' => Str::random(10),
    ];
});
