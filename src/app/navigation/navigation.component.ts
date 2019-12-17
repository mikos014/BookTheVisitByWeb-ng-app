import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorage} from '../core/token-storage';

@Component({
  selector: 'app-navigattion',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, private token: TokenStorage) { }

  ngOnInit() {
  }

  logout(): void {
    this.token.logOut();
    this.router.navigate(['/login']).then(() =>
      this.token.reloadPage());
  }
}
