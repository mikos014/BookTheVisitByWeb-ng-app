import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {log} from 'util';
import {AuthService} from 'angular5-social-login';
import {SocialloginService} from '../services/sociallogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'BookTheVisit';
  signUp: any = {} as any;

  username: '';
  password: '';
  showError = false;
  showLogout = false;

  abc: any;
  constructor(private router: Router, private apiService: ApiService,
              public OAuth: AuthService, private socialloginService: SocialloginService,  ) {
  }

  ngOnInit(): void {
    window.sessionStorage.removeItem('token');
  }

  login() {
    if ( !this.username || !this.password ) {
      this.showError = true;
      return;
    }
    this.showError = false;


    this.signUp.email = this.username;
    this.signUp.password = this.password;

    this.apiService.login(this.signUp)
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        console.log(res.text());
      });

    this.router.navigateByUrl('/home');



    // this.apiService.login(body.toString()).subscribe(
    //   data => {
    //         window.sessionStorage.setItem('token', JSON.stringify(data));
    //         console.log(window.sessionStorage.getItem('token'));
    //         this.router.navigateByUrl('/home');
    //       },
    //   error => {
    //         alert(error.error.error_description);
    // });
  }

}
