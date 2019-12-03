import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {
  model = {
    username: '',
    name: '',
    surname: '',
    password: '',
    password2: ''
  };
  showEmailError = false;
  showPasswordError = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  confirm() {
    if (this.model.password !== this.model.password2) {
      this.showPasswordError = true;
    } else {
      this.showPasswordError = false;
      this.router.navigateByUrl('home');
    }
  }

}
