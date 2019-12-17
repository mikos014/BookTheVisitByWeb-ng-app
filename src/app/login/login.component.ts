import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorage} from '../core/token-storage';
import {AuthenticationService} from '../core/authentication-service';

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

  constructor(private router: Router, private authentService: AuthenticationService, private token: TokenStorage) {
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
        // (res: any) => {
        // // console.log(res);
        // if (res === environment.responseOK) {
        //   this.router.navigateByUrl('/home');
        // } else if (res === environment.responseServerError) {
        //   this.showServerError = true;
        // } else {
        //   // nie działa wyśwetlanie komunikatu o błędzie logowania
        //   this.showError = true;
        // }
      // });
  }

  clearErrors() {
    this.showError = false;
    this.showLogout = false;
  }

  setLogoutStatus() {
    this.showLogout = true;
  }
}
