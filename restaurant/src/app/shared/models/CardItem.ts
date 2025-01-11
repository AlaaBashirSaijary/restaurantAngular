import { Food } from "./Food";

export class CartItem{
  constructor(food:Food){
    this.food=food;
  }
  food:Food;
  quantirty:number=1;
  get price():number{
    return this.food.price*this.quantirty;
  }
}
