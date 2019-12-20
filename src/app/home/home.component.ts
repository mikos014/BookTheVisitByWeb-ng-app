import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Visit} from '../models/visit.model';
import {Doctor} from '../models/doctor.model';
import {DateFilter} from '../models/date-filter.model';
import {User} from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filteredSpec: string;
  filteredDateFrom: string;
  filteredDateTo: string;

  isTableVisible = false;

  visits: Visit[];
  doctors: Doctor[];
  messageNoVisit = '';

  selectedRow: number;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getDoctors()
      .subscribe(
        data => {
          this.doctors = data as Doctor[];
        }
      );
  }

  search() {
    this.messageNoVisit = '';
    if (!this.filteredSpec && !this.filteredDateFrom && !this.filteredDateTo) {
      this.apiService.getUnoccupiedVisits()
        .subscribe(
          data => {
            this.visits = data as Visit[];
            this.isTableVisible = true;
          },
          error => {
            this.setMessageNoVisit();
          }
        );
    } else {
      let dateFilter: DateFilter;
      dateFilter = {
        dateFrom: this.filteredDateFrom,
        dateTo: this.filteredDateTo,
        spec: this.filteredSpec
      };

      this.apiService.getUnoccupiedVisitsFiltered(dateFilter)
        .subscribe(
        data => {
          this.visits = data as Visit[];
          this.isTableVisible = true;
        },
        error => {
          this.setMessageNoVisit();
          }
        );
      setTimeout(() => this.getDoctors(), 1000);
    }
  }

  getDoctors() {
    let doctor: Doctor;
    doctor = {
      id: null,
      name: null,
      spec: this.filteredSpec,
      surname: null
    };
    this.apiService.getDoctorsFiltered(doctor)
      .subscribe(
        data => {
          this.doctors = data as Doctor[];
          this.isTableVisible = true;
        },
        error => {
          this.setMessageNoVisit();
        }
      );

    // setTimeout(() => this.getDoctors(), 2000);
    // this.doctors.forEach(data => this.filterOfVisits.push(data.id));
    //
    // this.visits = this.visits.filter(data => this.filterOfVisits.indexOf(data.doctor) === -1);
    // for (let i = 0; i < this.visits.length; i++) {
    //   if (this.filterOfVisits.indexOf(this.visits[i].doctor) === -1) {
    //     this.visits;
    //   }
    // }
  }

  setMessageNoVisit() {
    this.messageNoVisit = 'There is no unoccupied visit.';
  }

  launchBooking(index) {
    this.selectedRow = this.visits[index].id;
    this.apiService.changeMessage(this.selectedRow);
    this.router.navigate(['/confirm']);
  }
}
