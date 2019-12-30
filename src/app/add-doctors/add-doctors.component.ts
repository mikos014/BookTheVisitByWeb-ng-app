import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Doctor} from '../models/doctor.model';

@Component({
  selector: 'app-add-doctors',
  templateUrl: './add-doctors.component.html',
  styleUrls: ['./add-doctors.component.css']
})
export class AddDoctorsComponent implements OnInit {

  showDoctorExistsError = false;
  name: string;
  spec: string;
  surname: string;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  confirm() {
    let doctor: Doctor;
    doctor = {
      id: null,
      name: this.name,
      spec: this.spec,
      surname: this.surname
    };

    this.apiService.addDoctor(doctor)
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.showDoctorExistsError = true;
        }
      );
  }

}
