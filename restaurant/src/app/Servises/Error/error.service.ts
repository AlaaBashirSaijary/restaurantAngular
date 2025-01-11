import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
private isErrorSubject=new BehaviorSubject<boolean>(false);
  constructor() { }
  showErroer(){
    this.isErrorSubject.next(true);

  }
  hideُError(){
    this.isErrorSubject.next(false);


  }
  get isError(){
    return this.isErrorSubject.asObservable();
  }

}
