import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavigationComponent } from './navigation/navigation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule, Routes} from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { BookedVisitsComponent } from './booked-visits/booked-visits.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ApiService } from './services/api.service';
import {AuthService, AuthServiceConfig, GoogleLoginProvider} from 'angular5-social-login';
import {TokenStorage} from './core/token-storage';
import {AuthenticationService} from './core/authentication-service';
import {Interceptor} from './core/Interceptor';
import { ConfirmComponent } from './confirm/confirm.component';

export function socialConfigs() {
  const config = new AuthServiceConfig(
[
      // {
      //   id: GoogleLoginProvider.PROVIDER_ID,
      //   provider: new GoogleLoginProvider('app-id')
      // }
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('81799120248-ocm1gn7uehog3s7m6g8bhjvoq62n1j24.apps.googleusercontent.com')
          }
    ]
  );
  return config;
}

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'editData',
    component: EditDataComponent
  },
  {
    path: 'myVisits',
    component: BookedVisitsComponent
  },
  {
    path: 'confirm',
    component: ConfirmComponent
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent,
    NotFoundComponent,
    HomeComponent,
    EditDataComponent,
    BookedVisitsComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    HttpClientModule
  ],
  providers: [
    ApiService,
    AuthService,
    AuthenticationService,
    TokenStorage,
    {provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true},
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
