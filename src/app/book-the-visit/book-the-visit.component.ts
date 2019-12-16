import { Component, OnInit } from '@angular/core';
import {HomeComponent} from '../home/home.component';
import { Router} from '@angular/router';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-book-the-visit',
  templateUrl: './book-the-visit.component.html',
  styleUrls: ['./book-the-visit.component.css']
})
export class BookTheVisitComponent implements OnInit {

  private currentId: any;

  constructor(private home: HomeComponent, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.home.message.subscribe(message => this.currentId = message);
  }

  confirmBooking() {
    this.apiService.bookTheVisit(this.currentId);
    this.router.navigateByUrl('/home');
  }
}
