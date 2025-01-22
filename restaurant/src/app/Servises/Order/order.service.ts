import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadingService } from '../Loading/loading.service';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  private createOrderUrl = `${this.baseUrl}/orders`;
  private orderStatusUrl = (orderId: number) => `${this.baseUrl}/orders/${orderId}/status`; // تم إزالة التكرار
  private ordersByUserUrl = (userId: number) => `${this.baseUrl}/users/${userId}/orders`; // تم إزالة التكرار
  private orderDetailsUrl = (orderId: number) => `${this.baseUrl}/orders/${orderId}`;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) { }

  // إنشاء طلب جديد
  createOrder(orderData: any) {
    this.loadingService.showLoading(); // عرض حالة التحميل
    return this.http.post(this.createOrderUrl, orderData).pipe(
      finalize(() => this.loadingService.hideLoading()), // إخفاء حالة التحميل بعد الانتهاء
      catchError((error) => {
        this.errorService.showErroer(); // عرض صفحة الأخطاء
        return of(null); // إرجاع Observable فارغ لتجنب تعطل التطبيق
      })
    );
  }

  // الحصول على حالة الطلب
  getOrderStatus(orderId: number) {
    this.loadingService.showLoading();
    return this.http.get(this.orderStatusUrl(orderId)).pipe(
      finalize(() => this.loadingService.hideLoading()),
      catchError((error) => {
        this.errorService.showErroer();
        return of(null);
      })
    );
  }

  // الحصول على الطلبات الخاصة بمستخدم معين
  getOrdersByUser(userId: number) {
    this.loadingService.showLoading();
    return this.http.get(this.ordersByUserUrl(userId)).pipe(
      finalize(() => this.loadingService.hideLoading()),
      catchError((error) => {
        this.errorService.showErroer();
        return of(null);
      })
    );
  }

  // الحصول على تفاصيل الطلب
  getOrderDetails(orderId: number) {
    this.loadingService.showLoading();
    return this.http.get(this.orderDetailsUrl(orderId)).pipe(
      finalize(() => this.loadingService.hideLoading()),
      catchError((error) => {
        this.errorService.showErroer();
        return of(null);
      })
    );
  }
}
