import { Component, OnInit } from '@angular/core';
import { CartService } from '../Servises/Cart/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CardItem';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FoodService } from '../Servises/food/food.service';
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, NotFoundComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cart!:Cart
  ngOnInit(): void {
  }
  setCart(){
    this.cart=this.cartServices.getCart();
  }
  removeFormCart(cartItem:CartItem){
    this.cartServices.removeFromCart(cartItem.food.id);
    this.setCart;
  }
  changeQuanity(cartItem:CartItem,quantityIsString:string){
const quantity=parseInt(quantityIsString);
this.cartServices.changeQunatiy(cartItem.food.id,quantity);
this.setCart();
  }
  constructor(private cartServices:CartService){


    this.setCart();
  }

}
