import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})



export class MenuComponent {
  title: string = 'Tecnoandina test'
  private requiredObject: number = 1;

  constructor(private router: Router) {
  }

public signin(): void {

}


}
