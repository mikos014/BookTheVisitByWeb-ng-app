import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  username: '';
  name: '';
  surname: '';
  password: '';
  password2: '';
  showEmailError = false;
  showPasswordError = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    // if (this.password !== this.password2) {
    //   this.showPasswordError = true;
    //   return;
    // }
    this.showPasswordError = false;
    this.apiService.createUser(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-user']);
      });

  }
}
