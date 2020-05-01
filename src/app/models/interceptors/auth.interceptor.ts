import { Injectable }             from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError }             from 'rxjs/operators';
import { Router }                 from '@angular/router';
import { AuthService }            from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401 || e.status == 403) {
          this.authService.doLogout();
          this.router.navigate(['/login']);
        };
        return throwError(e);
      })
    );

  }
}
