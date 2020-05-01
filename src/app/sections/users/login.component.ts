import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/models/services/auth.service';
import { MSGSERVERERROR } from 'src/app/components/messages';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html'
})

export class UserLoginComponent {
  title: string = 'Tecnoandina';
  public user: User = new User();
  public submitForm: boolean = false;
  public logueed: boolean = false;
  public businessErrors: string[] = [];
  public serviceErrors: string[] = [];

  constructor(private authService: AuthService
            , private router: Router) {
              this.authService.isAuthenticated()
                .then(value => { this.logueed = value; })
                .catch(error => { this.logueed = false; });
  }

  public cleanMessagesFormValidation(): void {
    this.submitForm = false;
    this.businessErrors = [];
    this.serviceErrors = [];
  }
  private errorControl(code: number) {
    let message = "";
    switch (code) {
      case 400: {
        message = "Credenciales no válidas";
        if (!this.businessErrors.includes(message)) {
          this.businessErrors.push(message);
        };
        break;
      }
      default: {
        if (!this.serviceErrors.includes(MSGSERVERERROR)) {
          this.serviceErrors.push(MSGSERVERERROR);
        };
        break;
      }
    };
  }

  public tryLogin(isValid: boolean){
    this.cleanMessagesFormValidation();
    this.submitForm = true;
    if (isValid) {
      let params = {
          type: "normal",
          username: this.user.email,
          password: this.user.password
      };
      this.authService.doLogin(params).subscribe(
        value => {
          this.logueed = true;
          let user = {
            id: value.id,
            full_name_display: value.full_name_display,
            photo: value.photo
          }
          this.authService.setToken(value.auth_token);
          this.authService.setUser(user);
          this.router.navigate(['/projects/userstories']);
        },
        error => {
          this.logueed = false;
          this.errorControl(error.status);
        }      
      )
    };
  }  

}
