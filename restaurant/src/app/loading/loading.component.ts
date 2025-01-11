import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../Servises/Loading/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit{
  isLoading!:boolean;
  ngOnInit(): void {
  }
  constructor( loadingServices:LoadingService){
    loadingServices.isLoading.subscribe((isLoading)=>{this.isLoading=isLoading});
   /* loadingServices.showLoading();*/
    /*setTimeout(() => {
      loadingServices.hideLoading();
    }, 3000);*/
  }

}
