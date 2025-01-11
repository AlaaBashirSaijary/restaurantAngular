import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../../Servises/Loading/loading.service';

let pendingRequest = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loading: LoadingService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Alert and log messages for debugging
    alert('Alaa Saijary');
    console.log('Alaa Saijary');

    // Show the loading indicator
    this.loading.showLoading();
    pendingRequest++;

    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<unknown>) => {
          if (event.type === HttpEventType.Response) {
            this.handleHideLoading();
          }
        },
        error: () => {
          this.handleHideLoading();
        },
      })
    );
  }

  private handleHideLoading(): void {
    pendingRequest--;
    if (pendingRequest === 0) {
      this.loading.hideLoading();
    }
  }
}
