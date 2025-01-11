import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JarwisService } from '../Servises/jarwis.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-reset',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css' // تم تصحيح الخطأ هنا
  ]
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null,
  };

  constructor(
    private Jarwis: JarwisService,
    private notify: MatSnackBar
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.notify.open('wait...', 'wait', { duration: 5000 })
    this.Jarwis.sendpasswordResetLink(this.form).subscribe(
      data => this.handelResponce(data),
      error => this.notify.open(error.error.error, 'Close', { duration: 3000 }) // تم تصحيح الكود هنا
    );
  }

  handelResponce(res: any) {
    this.notify.open(res.data, 'close', { duration: 5000 })
    this.form.email = null;
    this.notify.open('Password reset link sent successfully!', 'Close', { duration: 3000 });
  }
}
