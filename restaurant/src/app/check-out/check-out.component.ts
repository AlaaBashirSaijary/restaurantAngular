import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Orders } from '../shared/models/Oreders';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../Servises/Cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderItemsListComponent } from '../order-items-list/order-items-list.component';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [HeaderComponent, FormsModule, ReactiveFormsModule, OrderItemsListComponent, MapComponent],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CheckOutComponent implements OnInit {
  order: Orders = new Orders();
  checkoutform!: FormGroup;

  ngOnInit(): void {
    let { name, address } = { name: 'Alaa', address: 'Jeser' };
    this.checkoutform = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
    });
  }

  constructor(
    cartServices: CartService,
    private formBuilder: FormBuilder,
    private notify: MatSnackBar
  ) {
    const cart = cartServices.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
    console.log(this.order.items)
  }

  get fc() {
    return this.checkoutform.controls;
  }

  createOrder() {
    if (this.checkoutform.invalid) {
      this.showNotification('Please fill in all fields','Invalid Inputs');
    } else {
      this.showNotification('Order created successfully!','ok');
      return;
    }
    this.order.name=this.fc.name.value;
    this.order.address=this.fc.addresss.value;
    console.log(this.order);
  }

  private showNotification(message: string,button:string) {
    this.notify.open(message, button, {
      duration: 3000,
      panelClass: ['center-snackbar']  // إضافة الفئة المخصصة
    });
  }

}
