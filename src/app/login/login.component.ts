import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {log} from 'util';
import {AuthService} from 'angular5-social-login';
import {SocialloginService} from '../services/sociallogin.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'BookTheVisit';

  logIn: any = {} as any;
  username: '';
  password: '';

  showError = false;
  showLogout = false;
  showServerError = false;

  constructor(private router: Router, private apiService: ApiService,
              public OAuth: AuthService, private socialloginService: SocialloginService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.clearErrors();

    if ( !this.username || !this.password ) {
      this.showError = true;
      return;
    }

    this.logIn.email = this.username;
    this.logIn.password = this.password;

    this.apiService.login(this.logIn)
      .subscribe((res: any) => {
        // console.log(res);
        if (res === environment.responseOK) {
          this.router.navigateByUrl('/home');
        } else if (res === environment.responseServerError) {
          this.showServerError = true;
        } else {
          // nie działa wyśwetlanie komunikatu o błędzie logowania
          this.showError = true;
        }
      });
  }

  clearErrors() {
    this.showError = false;
    this.showLogout = false;
    this.showServerError = false;
  }

  setLogoutStatus() {
    this.showLogout = true;
  }
}
