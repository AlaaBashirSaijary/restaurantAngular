import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../shared/models/User';
import { IUserlogin } from '../../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { FoodService } from '../food/food.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private userSubject=new BehaviorSubject<User>(new User());
public userObservable:Observable<User>;
  constructor(private http:HttpClient,private foodServices:FoodService,private toatrServices:ToastrService) {
    this.userObservable=this.userSubject.asObservable();
  }

  
  public get currentUser():User{
    return this.userSubject.value;
  }
}
