<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tag::create(['name' => 'Italian', 'count' => 15]);
        Tag::create(['name' => 'All', 'count' => 50]);
        Tag::create(['name' => 'Pizza', 'count' => 2]);
        Tag::create(['name' => 'Fast Food', 'count' => 20]);
        Tag::create(['name' => 'Seafood', 'count' => 10]);
        Tag::create(['name' => 'Japanese', 'count' => 5]);
        $tags = [
            ['name' => 'Italian', 'count' => 15],
            ['name' => 'Fast Food', 'count' => 20],
            ['name' => 'Seafood', 'count' => 10],
            ['name' => 'Japanese', 'count' => 8],
        ];
        foreach ($tags as $tag) {
            Tag::updateOrCreate(
                ['name' => $tag['name']], // الشرط لتحديد التكرار
                ['count' => $tag['count']] // البيانات التي يتم تحديثها أو إضافتها
            );
        }
    }
}
