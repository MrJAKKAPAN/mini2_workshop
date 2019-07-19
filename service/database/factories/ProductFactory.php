<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'subject' => $faker->text(30),
        'title' => $faker->text(100),
        'detail' => $faker->text(2000),
        'price' => $faker->numberBetween(10, 10000),
        'image' => "https://via.placeholder.com/1280x720?text=TEST%20IMAGE" ,
        'status' => "true" ,
    ];
});
