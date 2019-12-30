import { Component, OnInit } from '@angular/core';
import {Doctor} from '../models/doctor.model';
import {Visit} from '../models/visit.model';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-all-visits',
  templateUrl: './all-visits.component.html',
  styleUrls: ['./all-visits.component.css']
})
export class AllVisitsComponent implements OnInit {

  visits: Visit[];
  doctors: Doctor[];
  users: User[];
  isTableVisible = true;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAllDoctors()
      .subscribe(
        data => {
          this.doctors = data as Doctor[];
        },
        error => {
          this.isTableVisible = false;
        }
      );

    this.apiService.getAllVisits()
      .subscribe(
        data => {
          this.visits = data as Visit[];
        },
        error => {
          this.isTableVisible = false;
        }
      );

    this.apiService.getAllUsers()
      .subscribe(
        data => {
          this.users = data as User[];
        },
        error => {
          this.isTableVisible = false;
        }
      );
  }

}
