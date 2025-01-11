import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { JarwisService } from '../Servises/jarwis.service';
import { TokenService } from '../Servises/token.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [    CommonModule,RouterLink, HttpClientModule,
      FormsModule,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {}
  public form = {
    name:null,
    email: null,
    password: null,
    password_confirmation :null
  };
  constructor(
    private Jarwis:JarwisService,
   private Token:TokenService,
   private router:Router) {}
  public error = null; // لإظهار رسالة الخطأ
  handelResponc(data:any){
    this.Token.handle(data.access_token);
this.router.navigateByUrl('/dashboard');
  }
  onSubmit(){
   this.Jarwis.signup(this.form).subscribe(
      (data:any) => this.handelResponc(data),
      (error:HttpErrorResponse) => this.handelError(error) // معالجة الخطأ
    );
  }
  handelError(error:HttpErrorResponse) {


      this.error = error.error.error;
  }
}
