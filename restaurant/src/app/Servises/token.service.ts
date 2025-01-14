import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly iss = {
    login: 'http://127.0.0.1:8000/api/login',
    signup: 'http://127.0.0.1:8000/api/signup',
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // تخزين الرمز
  handle(token: string): void {
    this.set(token);
  }

  // ضبط الرمز في LocalStorage
  set(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  // الحصول على الرمز من LocalStorage
  get(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem('token')
      : null;
  }

  // إزالة الرمز من LocalStorage
  remove(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  // فك التشفير للـ payload
  payload(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      return this.decode(payload);
    } catch (error) {
      console.error('Error decoding token payload:', error);
      return null;
    }
  }

  // فك تشفير Base64 إلى JSON
  decode(payload: string): any {
    try {
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Invalid payload:', error);
      return null;
    }
  }

  // التحقق من إذا كان المستخدم مسجل الدخول
  loggedIn(): boolean {
    return this.isValid();
  }

  // التحقق من صلاحية الرمز
  isValid(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false; // التحقق في بيئة الخادم
    }

    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload && payload.iss) {
        return Object.values(this.iss).includes(payload.iss);
      }
    }
    return false;
  }
}
