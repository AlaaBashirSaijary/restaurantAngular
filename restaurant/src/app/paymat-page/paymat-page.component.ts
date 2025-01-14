import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Orders } from '../shared/models/Oreders';
import { MapComponent } from "../map/map.component";
import { OrderItemsListComponent } from "../order-items-list/order-items-list.component";
import { PaypalButtonComponent } from '../paypal/paypal.component';

@Component({
  selector: 'app-paymat-page',
  standalone: true,
  imports: [HeaderComponent, PaypalButtonComponent, MapComponent, OrderItemsListComponent],
  templateUrl: './paymat-page.component.html',
  styleUrl: './paymat-page.component.css'
})
export class PaymatPageComponent implements OnInit{
  @Input()
  order!:Orders;
  ngOnInit(): void {
  }

}
