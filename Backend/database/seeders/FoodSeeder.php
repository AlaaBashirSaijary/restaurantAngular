<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Food;

class FoodSeeder extends Seeder
{
    public function run()
    {
        Food::create([
            'name' => 'Burger',
            'price' => 9.99,
            'tags' => ['Italian', 'Fast Food'],
            'favorite' => true,
            'stars' => 5,
            'image_url' => 'assets/img/1.jpg',
            'origins' => ['Italy'],
            'cook_time' => '30 minutes',
        ]);

        Food::create([
            'name' => 'Pizza',
            'price' => 14.99,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/2.jpg',
            'origins' => ['Japan'],
            'cook_time' => '20 minutes',
        ]);
        Food::create([
            'name' => 'Meat',
            'price' => 80.99,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/3.jpg',
            'origins' => ['Japan'],
            'cook_time' => '20 minutes',
        ]);
        Food::create([
            'name' => 'Food',
            'price' => 50.99,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/4.jpg',
            'origins' => ['Japan'],
            'cook_time' => '45 minutes',
        ]);
        Food::create([
            'name' => 'Pizza',
            'price' => 14.32,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/5.jpg',
            'origins' => ['Japan'],
            'cook_time' => '20 minutes',
        ]);
        Food::create([
            'name' => 'Pizza',
            'price' => 14.32,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/6.jpg',
            'origins' => ['Japan'],
            'cook_time' => '20 minutes',
        ]);
        Food::create([
            'name' => 'Pizza',
            'price' => 14.32,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/11.jpg',
            'origins' => ['Japan'],
            'cook_time' => '20 minutes',
        ]);
        Food::create([
            'name' => 'Pizza',
            'price' => 14.32,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/12.jpg',
            'origins' => ['Japan'],
            'cook_time' => '20 minutes',
        ]);
        Food::create([
            'name' => 'Pizza',
            'price' => 14.32,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/7.jpg',
            'origins' => ['Japan'],
            'cook_time' => '20 minutes',
        ]);
        Food::create([
            'name' => 'Pizza',
            'price' => 14.32,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/8.jpg',
            'origins' => ['Japan'],
            'cook_time' => '20 minutes',
        ]);
        Food::create([
            'name' => 'Pizza',
            'price' => 14.32,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/9.jpg',
            'origins' => ['Japan'],
            'cook_time' => '20 minutes',
        ]);
        Food::create([
            'name' => 'Pizza',
            'price' => 14.32,
            'tags' => ['Japanese', 'Seafood'],
            'favorite' => false,
            'stars' => 4,
            'image_url' => 'assets/img/10.jpg',
            'origins' => ['Japan'],
            'cook_time' => '20 minutes',
        ]);
    }
}

