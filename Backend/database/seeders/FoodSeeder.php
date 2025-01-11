<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Food;

class FoodSeeder extends Seeder
{
    public function run()
    {
        Food::create([
            'name' => 'Pizza',
            'price' => 9.99,
            'tags' => ['Italian', 'Fast Food'],
            'favorite' => true,
            'stars' => 5,
            'image_url' => 'assets/img/1.jpg',
            'origins' => ['Italy'],
            'cook_time' => '30 minutes',
        ]);

        Food::create([
            'name' => 'Sushi',
            'price' => 14.99,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/2.jpg',
            'origins' => ['Japan'],
            'cook_time' => '20 minutes',
        ]);
    }
}

