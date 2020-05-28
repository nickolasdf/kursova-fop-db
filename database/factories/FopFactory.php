<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Fop;
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

$factory->define(Fop::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'address' => $faker->address,
        'activities' => [rand(10,20), rand(20,30)],
        'registrationNumber' => Str::random(10),
        'registerLocation' => Str::random(3),
        'registrationDate' => now(),
        'phone' => $faker->phoneNumber,
        'email' => $faker->unique()->safeEmail,
        'taxNumber' => Str::random(10),
    ];
});
