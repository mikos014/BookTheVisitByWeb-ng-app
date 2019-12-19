import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Visit} from '../models/visit.model';
import {Doctor} from '../models/doctor.model';

@Component({
  selector: 'app-booked-visits',
  templateUrl: './booked-visits.component.html',
  styleUrls: ['./booked-visits.component.css']
})
export class BookedVisitsComponent implements OnInit {

  visits: Visit[];
  doctors: Doctor[];
  isTableVisible = true;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getDoctors()
      .subscribe(
        data => {
          this.doctors = data as Doctor[];
        },
        error => {
          this.isTableVisible = false;
        }
      );

    this.apiService.getMyVisits()
      .subscribe(
        data => {
          this.visits = data as Visit[];
        },
        error => {
            this.isTableVisible = false;
          }
      );
  }

}
