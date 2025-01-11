import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { JarwisService } from '../Servises/jarwis.service';
import { TokenService } from '../Servises/token.service';
import { AuthService } from '../Servises/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null,
  };
  public error: string | null = null; // لإظهار رسالة الخطأ

  constructor(
    private Jarwis:JarwisService,
    private Token:TokenService,
    private router:Router,
    private Auth:AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {

   this.Jarwis.login(this.form).subscribe(
      (data:any) => {
       this.handelLoginResponce(data)
      },
      (error) => this.handelError(error) // معالجة الخطأ
    );
  }
  handelLoginResponce(data:any){
this.Token.handle(data.access_token);
this.Auth.changeAtuhStatus(true);
this.router.navigateByUrl('/home');
  }
  handelError(error:HttpErrorResponse) {
    // عرض رسالة الخطأ المرسلة من الخادم
    if (error.error && error.error.error) {
      this.error = 'Email or password doesn\'t exsict';
    } else {
      this.error = 'An unexpected error occurred. Please try again.';
    }
  }

}
