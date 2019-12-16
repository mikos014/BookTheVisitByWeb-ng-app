import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-navigattion',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  // logout() {
  //   this.http.post('logout', {}).finally(() => {
  //     this.app.authenticated = false;
  //     this.router.navigateByUrl('/');
  //   }).subscribe();
  // }

  logout() {
    // this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
