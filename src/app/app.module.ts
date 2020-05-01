import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './sections/menu/menu.component';
import { UserLoginComponent } from './sections/users/login.component';
import { AuthInterceptor } from './models/interceptors/auth.interceptor';
import { TokenInterceptor } from './models/interceptors/token.interceptor';
import { AuthService } from './models/services/auth.service';
import { HttpErrorCodeComponent } from './errors/http-error-code.component';
import { ProjectsService } from './models/services/projects.service';
import { ProjectUserStoriesComponent } from './sections/projects/userstories.component';
import { UserAccountComponent } from './sections/users/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HttpErrorCodeComponent,
    MenuComponent,
    UserLoginComponent,
    UserAccountComponent,
    ProjectUserStoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    AuthService,
    ProjectsService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
