<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\View;
use Faker\Generator as Faker;

$factory->define(View::class, function (Faker $faker) {
    return [
        'ip' => '127.0.0.1',
        'detail' => $faker->text,
        'product_id' => $faker->numberBetween(1, 50),
    ];
});
