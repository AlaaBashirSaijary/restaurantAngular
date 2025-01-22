import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Orders } from '../shared/models/Oreders';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../Servises/Cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderItemsListComponent } from '../order-items-list/order-items-list.component';
import { MapComponent } from '../map/map.component';
import { Route, Router } from '@angular/router';
import { OrderService } from '../Servises/Order/order.service';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // إضافة الاستيراد
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [HeaderComponent, FormsModule, ReactiveFormsModule, OrderItemsListComponent,MapComponent,HttpClientModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],

})
export class CheckOutComponent implements OnInit {
  order: Orders = new Orders();
  checkoutform!: FormGroup;
 // let orderObserv:Observable<>(),
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
    private notify: MatSnackBar,
    private http: HttpClient,
    private router:Router,
   // private orderServices:OrderService
  ) {
    const cart = cartServices.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
    console.log(this.order.items);

  }

  get fc() {
    return this.checkoutform.controls;
  }

  createOrder() {
    if (this.checkoutform.invalid) {
      this.showNotification('Please fill in all fields', 'Invalid Inputs');
      return; // إيقاف التنفيذ إذا كان النموذج غير صالح
    }

    // تحديث بيانات الطلب
    this.order.address = this.fc.address.value;
    this.order.name = this.fc.name.value;
    this.router.navigateByUrl('/payment');
    // استدعاء خدمة إنشاء الطلب
  /*  this.orderServices.createOrder(this.order).subscribe({
      next: (response) => {
        this.showNotification('Order created successfully!', 'OK');
        this.router.navigateByUrl('/payment'); // التوجيه إلى صفحة الدفع عند النجاح
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.showNotification('Failed to create order. Please try again.', 'Error');
      }
    });*/
  }


  private showNotification(message: string,button:string) {
    this.notify.open(message, button, {
      duration: 3000,
      panelClass: ['center-snackbar']  // إضافة الفئة المخصصة
    });
  }

}
