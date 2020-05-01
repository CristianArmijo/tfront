import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AuthGuard } from './models/guards/auth.guard';
import { HttpErrorCodeComponent } from './errors/http-error-code.component';
import { UserLoginComponent } from './sections/users/login.component';
import { ProjectUserStoriesComponent } from './sections/projects/userstories.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'projects/userstories', component: ProjectUserStoriesComponent, canActivate: [AuthGuard] },  
  { path: 'error', component: HttpErrorCodeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/error']);
    }
  }
  
}

