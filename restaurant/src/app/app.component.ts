import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS, withInterceptors, provideHttpClient } from '@angular/common/http';
import { JarwisService } from './Servises/jarwis.service';
import { TokenService } from './Servises/token.service';
import { AuthService } from './Servises/auth.service';
import { BeforeLoginService } from './Servises/before-login.service';
import { AfterLoginService } from './Servises/after-login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoodService } from './Servises/food/food.service';
import { LoadingComponent } from "./loading/loading.component";
import { LoadingInterceptor } from './shared/interceptor/loading.interceptor';
import { LoadingService } from './Servises/Loading/loading.service';
import { HttpErrorInterceptor } from './core/http.interceptor';
import { ErrorComponent } from "./error/error.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    LoadingComponent,
],
  providers:[JarwisService,TokenService,AuthService,BeforeLoginService,LoadingService,AfterLoginService,FoodService,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Fixed typo from styleUrl to styleUrls
})
export class AppComponent {
  title = 'restaurant';
  constructor(private notify: MatSnackBar) {}
  showNotification(message: string) {
    this.notify.open(message, 'Close', {
      duration: 3000, // مدة العرض
    });
  }
}
