import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'BookTheVisit';

  username: '';
  password: '';
  showError = false;
  showLogout = false;
  constructor(private router: Router, private apiService: ApiService) {
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
    const body = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);

    this.apiService.login(body.toString()).subscribe(
      data => {
            window.sessionStorage.setItem('token', JSON.stringify(data));
            console.log(window.sessionStorage.getItem('token'));
            this.router.navigate(['/home']);
          },
      error => {
            alert(error.error.error_description);
    });
  }

}
