import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Servises/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../Servises/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  public loggedIn:boolean=true;
logout(event:MouseEvent){
  event.preventDefault();
  this.Token.remove();
  this.Auth.changeAtuhStatus(false);
this.router.navigateByUrl('/login');
}
  ngOnInit(){
   this.Auth.authStatus.subscribe(value=>this.loggedIn=value);
  }
constructor (private Auth:AuthService,private router:Router,private Token:TokenService){}
}
