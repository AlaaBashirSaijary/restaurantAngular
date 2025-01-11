import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from '../Servises/jarwis.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-response-password',
  standalone: true,
  imports: [ FormsModule,CommonModule
  ],
  templateUrl: './response-password.component.html',
  styleUrl: './response-password.component.css'
})
export class ResponsePasswordComponent implements OnInit{
  public error: string | null = null; // لإظهار رسالة الخطأ
  public form = {
    email: null,
    password: null,
    password_confirmation :null,
resetToken:null
  };
   handelError(error:HttpErrorResponse) {
     this.error=error.error.errors;
    }
    handelResponce(data: any) {
      let _route = this.route;
      const snackbarRef = this.notify.open('Done! Now Login with new Password', 'Okay', {
        duration: 3000
      });

      // Navigate when the action button is clicked
      snackbarRef.onAction().subscribe(() => {
        _route.navigateByUrl('/login');
      });
    }
  onSubmit(){
    this.Jarwis.changePassword(this.form).subscribe(
      data => this.handelResponce(data),
      error =>this.handelResponce(error), // تم تصحيح الكود هنا
    );
  }
  ngOnInit() {}
  constructor(
        private Jarwis: JarwisService,
      private router:ActivatedRoute,
      private route:Router,
          private notify: MatSnackBar

  ){
    router.queryParams.subscribe(
      params=>{
        this.form.resetToken=params['token']
      }
    );
  }
}
