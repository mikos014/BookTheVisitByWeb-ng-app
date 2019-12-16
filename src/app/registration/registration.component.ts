import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  signUp: any = {} as any;

  username: '';
  name: '';
  surname: '';
  password: '';
  password2: '';

  showEmptyInputError = false;
  showEmailError = false;
  showPasswordError = false;
  showLenPasswordError = false;

  constructor(private router: Router, private apiService: ApiService) { }

  // addForm: FormGroup;

  ngOnInit() {
  }

  register() {
    this.showEmptyInputError = false;
    this.showEmailError = false;
    this.showPasswordError = false;
    this.showLenPasswordError = false;

    if (!this.username || !this.password || !this.password2 || !this.name || !this.surname) {
      this.showPasswordError = false;
      this.showEmptyInputError = true;
    } else if (this.password !== this.password2) {
      this.showEmptyInputError = false;
      this.showPasswordError = true;
      return;
    }

    this.signUp.email = this.username;
    this.signUp.password = this.password;
    this.signUp.name = this.name;
    this.signUp.surname = this.surname;

    this.apiService.register(this.signUp)
      .subscribe((res: any) => {
        // console.log(res.text());
        console.log(res);
        if (res === environment.responseOK) {
          this.router.navigateByUrl('/login');
        } else if (res === environment.responseEmailConflict) {
          // nie działa wyśwetlanie komunikatu o błędzie logowania
          this.showEmailError = true;
        } else if (res === environment.responseLenPasswordError) {
          this.showLenPasswordError = true;
        }
      });

  }
}
