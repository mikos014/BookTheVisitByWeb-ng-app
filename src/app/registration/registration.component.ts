import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  model = {
    username: '',
    name: '',
    surname: '',
    password: '',
    password2: ''
  };
  showEmailError = false;
  showPasswordError = false;
  constructor() { }

  ngOnInit() {
  }

  register() {
    if (this.model.password !== this.model.password2) {
      this.showPasswordError = true;
    } else {
      this.showPasswordError = false;
    }
  }
}
