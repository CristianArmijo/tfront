import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Payload } from 'src/app/models/security/Payload';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthService {
  private _payload: Payload;
  private _token: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  public doLogin(params) {
    return this.http.post<any>(environment.PATH_tecnoandinaapi + '/api/v1/auth', JSON.stringify(params));
  }

  public doLogout() {
    this.logout();
  }


  /////////////////////////////////////////////////////////////////////////////////////

  public get payload(): Payload {
    let dtkn: Payload = new Payload();
    if (this.user != null) {
      let u = JSON.parse(this.user);
      dtkn.uid = u.id.toString();
      dtkn.fullname = u.full_name_display;
      dtkn.photo = u.photo;
    };
    return dtkn;
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else {
      if (sessionStorage.getItem('token') != null) {
        this._token = sessionStorage.getItem('token');
        return this._token;
      };
    };
    return null;
  }

  private get user(): string {
    if (sessionStorage.getItem('user') != null) {
      return sessionStorage.getItem('user');
    };
    return null;
  }

  public setToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  public setUser(userInfo): void {
    sessionStorage.setItem('user', JSON.stringify(userInfo));
  }

  private removeSession(): void {
    this._token = null;
    this._payload = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  private obtenerDatosToken(token: string): any {
    if (token != null) {
      return JSON.parse(atob(token.split(".")[1]));
    };
    return null;
  }

  private logout(): void {
    this.removeSession();
    this.router.navigate(['/login']);
  }


  // Metodos de consulta

  public async isAuthenticated(): Promise<boolean> {
    let payl = this.payload;
    if (payl != null && payl.uid != "") {
      return true;
    } else {
      return false;
    };
  }
  
  private isTokenExpired(): boolean {
    let payl = this.obtenerDatosToken(this.token);
    let now = new Date().getTime() / 1000;
    if (payl.exp < now) {
      return true;
    };
    return false;
  }

}
