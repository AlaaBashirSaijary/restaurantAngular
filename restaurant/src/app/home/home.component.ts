import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FoodService } from '../Servises/food/food.service';
import { Food } from '../shared/models/Food';
import { NgxStarsModule } from 'ngx-stars';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from "../search/search.component";
import { TagsComponent } from "../tags/tags.component";
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from "../not-found/not-found.component";
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from "../error/error.component";
import { ErrorService } from '../Servises/Error/error.service';  // استيراد ErrorService

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    HeaderComponent,
    NgxStarsModule,
    RouterModule,
    SearchComponent,
    TagsComponent,
    NotFoundComponent,
    ErrorComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  isError: boolean = false;  // حالة الخطأ

  constructor(
    private foodServices: FoodService,
    private route: ActivatedRoute,
    private errorService: ErrorService // حقن ErrorService
  ) {}

  ngOnInit(): void {
    // الاشتراك في حالة الخطأ
    this.errorService.isError.subscribe((isError) => {
      this.isError = isError;  // تحديث حالة الخطأ
    });

    // الاشتراك في معلمات الـ URL
    this.route.params.subscribe(params => {
      let foodObservable: Observable<Food[]>;  // تعريف المتغير الخاص بالأطعمة
      const searchTerm = params['searchTerm'];
      const tag = params['tag'];

      // تحديد الخدمة المناسبة بناءً على معلمات URL
      if (searchTerm) {
        foodObservable = this.foodServices.getFoodBySearchTreamServer(searchTerm);
      } else if (tag) {
        foodObservable = this.foodServices.getFoodsByTagServer(tag);
      } else {
        foodObservable = this.foodServices.getAllServer();
      }

      // الاشتراك في الاستجابة من الخادم
      foodObservable.subscribe(
        (serverFoods) => {
          console.log("Data from server:", serverFoods);  // طباعة البيانات المستلمة
          this.foods = serverFoods;  // تخزين الأطعمة في المصفوفة
        },
        (error) => {
          this.isError = true;  // في حالة حدوث خطأ يتم ضبط حالة الخطأ على true
          console.error('Error occurred:', error);
        }
      );
    });
  }

  onRate(newRating: number, food: Food): void {
    food.stars = newRating;
    console.log(`New rating for ${food.name}: ${newRating}`);
  }
}
