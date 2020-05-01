import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/models/services/auth.service';
import { MSGSERVERERROR } from 'src/app/components/messages';

@Component({
  selector: 'app-user-account',
  templateUrl: './account.component.html'
})

export class UserAccountComponent {
  title: string = 'Tecnoandina';
  public user: User = new User();
  public submitForm: boolean = false;
  public logueed: boolean = false;
  public businessErrors: string[] = [];
  public serviceErrors: string[] = [];

  constructor(public authService: AuthService
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

  public tryLogout() {
    this.submitForm = true;
    this.logueed = false;
    this.authService.doLogout();
  }


}
