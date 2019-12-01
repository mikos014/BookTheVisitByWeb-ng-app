import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigattion',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // logout() {
  //   this.http.post('logout', {}).finally(() => {
  //     this.app.authenticated = false;
  //     this.router.navigateByUrl('/');
  //   }).subscribe();
  // }
}
