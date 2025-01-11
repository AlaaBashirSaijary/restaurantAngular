import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Inject the router for navigation

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 400 && error.status < 600) {
        console.error('Error occurred:', error);
        router.navigateByUrl('/Error')
      }
      return throwError(() => error);
    })
  );
};
