import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'; // لاستخدام finalize
import { LoadingService } from './Loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  // دالة التسجيل
  signup(data: any): Observable<any> {
    this.loadingService.showLoading(); // تشغيل واجهة الانتظار
    return this.http.post(`${this.baseUrl}/signup`, data).pipe(
      finalize(() => this.loadingService.hideLoading()) // إيقاف واجهة الانتظار
    );
  }

  // دالة تسجيل الدخول
  login(data: any): Observable<any> {
    this.loadingService.showLoading(); // تشغيل واجهة الانتظار
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      finalize(() => this.loadingService.hideLoading()) // إيقاف واجهة الانتظار
    );
  }

  // دالة إرسال رابط إعادة تعيين كلمة المرور
  sendpasswordResetLink(data: any): Observable<any> {
    this.loadingService.showLoading(); // تشغيل واجهة الانتظار
    return this.http.post(`${this.baseUrl}/sendPassword`, data).pipe(
      finalize(() => this.loadingService.hideLoading()) // إيقاف واجهة الانتظار
    );
  }

  // دالة تغيير كلمة المرور
  changePassword(data: any): Observable<any> {
    this.loadingService.showLoading(); // تشغيل واجهة الانتظار
    return this.http.post(`${this.baseUrl}/resetPassword`, data).pipe(
      finalize(() => this.loadingService.hideLoading()) // إيقاف واجهة الانتظار
    );
  }
}
