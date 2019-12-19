import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {
  // private formData: any = {} as any;
  email: string = null;
  password: string = null;
  password2: string = null;

  showEmailError = false;
  showPasswordError = false;
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  confirm(): void {
    this.clearErrors();

    if (this.password !== this.password2) {
      this.showPasswordError = true;
    } else {
      console.log(this.email + this.password);

      let user: User;
      user = {
        email: this.email,
        password: this.password
      };

      this.apiService.editData(user)
        .subscribe(
          data => {
            this.router.navigate(['/home']);
          },
          error => {
            this.showEmailError = true;
        });
    }
  }

  clearErrors() {
    this.showEmailError = false;
    this.showPasswordError = false;
  }

}
