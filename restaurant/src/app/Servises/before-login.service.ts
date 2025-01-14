import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class BeforeLoginService implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(): boolean {
    return !this.tokenService.loggedIn(); // إذا لم يكن المستخدم مسجل الدخول
  }
}
