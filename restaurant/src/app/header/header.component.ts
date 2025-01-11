import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../Servises/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule,CommonModule // تأكد من تضمين التوجيه هنا
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  logout(): void {
    this.authService.changeAtuhStatus(false);

  }

  ngOnInit(): void {
    this.authService.authStatus.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
constructor( private authService:AuthService){

}
}
