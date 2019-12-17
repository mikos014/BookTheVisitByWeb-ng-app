import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../core/authentication-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  showEmptyInputError = false;
  showEmailError = false;
  showPasswordError = false;
  showLenPasswordError = false;

  // private signUp: any = {} as any;
  private username: '';
  private name: '';
  private surname: '';
  private password: '';
  private password2: '';

  private response;

  constructor(private router: Router, private authentService: AuthenticationService) { }

  // addForm: FormGroup;

  ngOnInit() {
  }

  register() {
    this.clearErrors();

    if (!this.username || !this.password || !this.password2 || !this.name || !this.surname) {
      this.showPasswordError = false;
      this.showEmptyInputError = true;
    } else if (this.password !== this.password2) {
      this.showEmptyInputError = false;
      this.showPasswordError = true;
      return;
    }


    this.authentService.register(this.username, this.name, this.surname, this.password)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
          console.log(data);
        },
        error => {
            this.showEmailError = true;
            console.log(error);
        });
      //   if (this.response === environment.responseOK) {
      //   this.router.navigate(['/login']);
      // } else if (this.response === environment.responseEmailConflict) {
      //   // nie działa wyśwetlanie komunikatu o błędzie logowania
      //   this.showEmailError = true;
      // } else if (this.response === environment.responseLenPasswordError) {
      //   this.showLenPasswordError = true;
      // }
      // });
  }

  clearErrors() {
    this.showEmptyInputError = false;
    this.showEmailError = false;
    this.showPasswordError = false;
    this.showLenPasswordError = false;
  }
}
