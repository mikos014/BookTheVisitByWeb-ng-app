import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorage} from '../core/token-storage';
import {AuthenticationService} from '../core/authentication-service';
import {AuthService, GoogleLoginProvider} from 'angular5-social-login';
import {Socialuser} from '../models/socialuser.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'BookTheVisit';

  // logInForm: any = {} as any;
  username: '';
  password: '';

  showError = false;
  showLogout = false;
  socialUser: Socialuser;

  constructor(private router: Router, private authentService: AuthenticationService,
              private token: TokenStorage, public OAuth: AuthService) {
  }

  ngOnInit(): void {
    if (this.token.isUserSignedIn()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.clearErrors();

    if ( !this.username || !this.password ) {
      this.showError = true;
      return;
    }

    this.authentService.login(this.username, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.token.saveToken(data);
          this.token.reloadPage();
        },
        error => {
          console.log(error);
          this.showError = true;
      });

  }

  clearErrors() {
    this.showError = false;
    this.showLogout = false;
  }

  public socialSignIn() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      console.log('google', socialusers);
      console.log(socialusers);
      this.socialUser = socialusers;
    });
    setTimeout(() => this.SaveResponse(this.socialUser), 2500);

  }
  SaveResponse(socialusers: Socialuser) {

    const email = socialusers.email;
    const password = 'google';
    console.log(email);
    this.authentService.login(email, password)
      .subscribe(
        data => {
          console.log(data);
          this.token.saveToken(data);
          this.token.reloadPage();
        },
        error => {
          console.log(error);
          this.showError = true;
        });
  }

  setLogoutStatus() {
    this.showLogout = true;
  }
}
