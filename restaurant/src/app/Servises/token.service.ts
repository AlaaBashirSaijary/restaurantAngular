import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
private iss={
  login:'http://127.0.0.1:8000/api/login',
  signup:'http://127.0.0.1:8000/api/signup',
  
};
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  handle(token:any){
this.set(token);
  }
  set(token:any){
    localStorage.setItem('token',token);
    console.log(this.isValid())
  }
  get(){
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;  }
  remove(){
    return localStorage.removeItem('token')
  }
  payload(token:any){
    const payload= token.split('.')[1];
    return this.decode(payload);
  }
  decode(payload:any){
    return JSON.parse(atob(payload));
  }
  loggedIn(){
    return this.isValid();
  }
  isValid(){
    if (!isPlatformBrowser(this.platformId)) {
      return false; // إذا كنا في بيئة الخادم
    }
    const token=this.get();
    if (token){
      const payload=this.payload(token);
      if(payload){
       return Object.values(this.iss).indexOf(payload.iss)>-1?true:false;
      }
    }
    return false;
  }
}
