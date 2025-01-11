import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food';
import { Tag } from '../../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '../../Servises/Loading/loading.service';
import { finalize, catchError } from 'rxjs/operators'; // استخدام catchError
import { ErrorService } from '../Error/error.service';


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private errorService: ErrorService // حقن الـ ErrorService
  ) {}

  private baseUrl = 'http://127.0.0.1:8000/api';
  foodUrl = this.baseUrl + '/foods';
  tagsUrl = this.baseUrl + '/tags';
  searchUrl = this.foodUrl + '/search/';
  foodTagUrl = this.baseUrl + '/tag/';
  foodIDURL = this.foodUrl + '/';
  LoginURL = this.baseUrl + '/api/users/login';

  // واجهة الطعام الافتراضي
  newFood(): Food {
    return {
      id: 0,
      name: 'Unknown',
      price: 0,
      tags: [],
      favorite: false,
      stars: 0,
      image_url: 'assets/assets/img/4.jpg',
      origins: [],
      cook_time: ''
    };
  }

  // جلب طعام معين حسب ID (من الخادم)
  getFoodIdServer(id: number): Observable<Food> {
    this.loadingService.showLoading(); // تشغيل واجهة الانتظار
    return this.http.get<Food>(this.foodIDURL + id).pipe(
      finalize(() => this.loadingService.hideLoading()), // إيقاف واجهة الانتظار
      catchError(error => {
        this.errorService.showErroer(); // تفعيل عرض الخطأ في حال حدوث مشكلة
        return throwError(() => error); // إعادة الخطأ
      })
    );
  }

  // جلب جميع الأطعمة (من الخادم)
  getAllServer(): Observable<Food[]> {
    this.loadingService.showLoading(); // تشغيل واجهة الانتظار
    return this.http.get<Food[]>(this.foodUrl).pipe(
      finalize(() => this.loadingService.hideLoading()), // إيقاف واجهة الانتظار
      catchError(error => {
        this.errorService.showErroer(); // تفعيل عرض الخطأ في حال حدوث مشكلة
        return throwError(() => error); // إعادة الخطأ
      })
    );
  }

  // جلب العلامات (من الخادم)
  getAllTagsServer(): Observable<Tag[]> {
    this.loadingService.showLoading(); // تشغيل واجهة الانتظار
    return this.http.get<Tag[]>(this.tagsUrl).pipe(
      finalize(() => this.loadingService.hideLoading()), // إيقاف واجهة الانتظار
      catchError(error => {
        this.errorService.showErroer(); // تفعيل عرض الخطأ في حال حدوث مشكلة
        return throwError(() => error); // إعادة الخطأ
      })
    );
  }

  // البحث عن طعام بواسطة الاسم (من الخادم)
  getFoodBySearchTreamServer(searchTream: string): Observable<Food[]> {
    this.loadingService.showLoading(); // تشغيل واجهة الانتظار
    return this.http.get<Food[]>(this.searchUrl + searchTream).pipe(
      finalize(() => this.loadingService.hideLoading()), // إيقاف واجهة الانتظار
      catchError(error => {
        this.errorService.showErroer(); // تفعيل عرض الخطأ في حال حدوث مشكلة
        return throwError(() => error); // إعادة الخطأ
      })
    );
  }

  // جلب الأطعمة حسب العلامة (من الخادم)
  getFoodsByTagServer(tag: string): Observable<Food[]> {
    this.loadingService.showLoading(); // تشغيل واجهة الانتظار
    return (tag === "All"
      ? this.getAllServer()
      : this.http.get<Food[]>(this.foodTagUrl + tag)
    ).pipe(
      finalize(() => this.loadingService.hideLoading()), // إيقاف واجهة الانتظار
      catchError(error => {
        this.errorService.showErroer(); // تفعيل عرض الخطأ في حال حدوث مشكلة
        return throwError(() => error); // إعادة الخطأ
      })
    );
  }
}
