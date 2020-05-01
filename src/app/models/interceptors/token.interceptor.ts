import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.token;
    let lio = req.url.lastIndexOf("/");
    let meth = "";
    if (lio > 0) {
      meth = req.url.substring(lio + 1);
    };

    if (token != null) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      });
      const authReq = req.clone({ headers });
      return next.handle(authReq);

    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const authReq = req.clone({ headers });
      return next.handle(authReq);
      
    };
    
  }
}
