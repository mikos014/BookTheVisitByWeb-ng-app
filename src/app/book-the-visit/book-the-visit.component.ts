import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Visit} from '../models/visit.model';
import {Doctor} from '../models/doctor.model';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-book-the-visit',
  templateUrl: './book-the-visit.component.html',
  styleUrls: ['./book-the-visit.component.css']
})
export class BookTheVisitComponent implements OnInit {

  currentId: number;
  visit: Visit[];
  doctor: Doctor[];
  isVisibleBody = false;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    // this.apiService.currentMessage.subscribe(message => this.currentId = message);
    // console.log(this.currentId);

    this.apiService.getDoctors()
      .subscribe(
        data => {
          this.doctor = data as Doctor[];
        }
      );
    console.log('das' + this.doctor);

    this.apiService.getMyVisits()
      .subscribe(
        data => {
          this.visit = data as Visit[];
        }
      );
    }

  confirmBooking() {
    this.apiService.bookTheVisit(this.currentId);
    this.router.navigateByUrl('/home');
  }
}
