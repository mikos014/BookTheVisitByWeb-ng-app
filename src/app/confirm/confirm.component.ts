import { Component, OnInit } from '@angular/core';
import {Visit} from '../models/visit.model';
import {Doctor} from '../models/doctor.model';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';
import {async} from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  currentId: number;
  visit: Visit;
  doctorId: number;
  doctor: Doctor;
  isVisibleBody = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.currentMessage.subscribe(message => this.currentId = message);
    console.log(this.currentId);

    if (this.currentId !== -1) {
      this.apiService.getVisitById(this.currentId)
        .subscribe(
          data => {
            this.visit = JSON.parse(JSON.stringify(data));
            this.doctorId = this.visit.doctor;
            console.log(this.doctorId);
          },
          error => {
          }
        );
      setTimeout(() => this.getDoctor(), 1000);
    }
  }

  getDoctor() {
    this.apiService.getDoctorById(this.doctorId)
      .subscribe(
        data => {
          this.doctor = JSON.parse(JSON.stringify(data));
          this.isVisibleBody = true;
        }
      );
  }

  confirmBooking() {
    this.apiService.bookTheVisit(this.currentId)
      .subscribe(
        data => this.router.navigateByUrl('/home'),
        error => {
        });
  }

}
