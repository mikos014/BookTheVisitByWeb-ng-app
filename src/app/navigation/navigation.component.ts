import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigattion',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // logout() {
  //   this.http.post('logout', {}).finally(() => {
  //     this.app.authenticated = false;
  //     this.router.navigateByUrl('/');
  //   }).subscribe();
  // }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
