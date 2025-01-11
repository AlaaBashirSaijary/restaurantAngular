import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Food } from '../shared/models/Food';
import { FoodService } from '../Servises/food/food.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxStarsModule } from 'ngx-stars'; // استيراد NgxStarsModule
import { CommonModule } from '@angular/common';
import { TagsComponent } from "../tags/tags.component";
import { CartService } from '../Servises/Cart/cart.service';
import { Router } from '@angular/router';
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [HeaderComponent, NgxStarsModule, CommonModule, RouterModule, TagsComponent, NotFoundComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent implements OnInit{
   food!: Food; // قمنا بإزالة التحذير هنا
   notFound: boolean = false; // إضافة متغير للتحقق من وجود الطعام

   onRate(newRating: number, food: Food): void {
    food.stars = newRating;
    console.log(`New rating for ${food.name}: ${newRating}`);
  }

  addToCart() {
    console.log("Adding to cart:", this.food); // اختبار وصول الدالة
    this.CartServices.addToCart(this.food);
    this.router.navigateByUrl('/cart')
  }

  ngOnInit(): void {
  }

  constructor(private foodServices: FoodService,
    private activateRouter: ActivatedRoute,
    private CartServices: CartService,
    private router: Router
  ) {
    this.activateRouter.params.subscribe((params) => {
      const foodId = params['id'];


         this.foodServices.getFoodIdServer(foodId).subscribe(
          serverTags=>{
            this.food=serverTags;
          }
         );
          console.log(this.food.image_url)


    });
  }
}
