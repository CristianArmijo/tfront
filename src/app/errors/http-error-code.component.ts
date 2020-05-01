import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-http-error-code',
  templateUrl: './http-error-code.component.html'
})


export class HttpErrorCodeComponent {
  title: string = 'No Encontrado - Tecnoandina.cl';

  constructor(private router: Router) {
  }

}
