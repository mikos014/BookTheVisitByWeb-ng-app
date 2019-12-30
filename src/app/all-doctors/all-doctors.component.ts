import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Doctor} from '../models/doctor.model';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.css']
})
export class AllDoctorsComponent implements OnInit {

  doctors: Doctor[];
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
  }

}
