import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Food } from '../../shared/models/Food';
import { CartItem } from '../../shared/models/CardItem';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cart:Cart=new Cart();
/*private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.cart);*/

  constructor() { }
  changeQunatiy(foodId:number,quantirty:number){
    let cartItem=this.cart.items.find(item=>item.food.id===foodId);
    if(!cartItem) return;
    cartItem.quantirty=quantirty;
  }
  getCart():Cart{
    return this.cart;
  }
  addToCart(food:Food):void{
let cartItem=this.cart.items.find(
  item=>item.food.id===food.id
);
if(cartItem){
this.changeQunatiy(food.id,cartItem.quantirty+1);
return;
}
this.cart.items.push(new CartItem(food));
  }
  removeFromCart(foodId:number):void{
    this.cart.items=this.cart.items.filter(item=>item.food.id !=foodId);
  }
  /*getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }*/
  clearCart(){
    this.cart=new Cart();
  }
}
