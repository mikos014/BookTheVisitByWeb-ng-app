import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Visit} from '../models/visit.model';

@Component({
  selector: 'app-add-visits',
  templateUrl: './add-visits.component.html',
  styleUrls: ['./add-visits.component.css']
})
export class AddVisitsComponent implements OnInit {

  showVisitExistsError: boolean;
  date: any;
  time: string;
  doctor: number;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  confirm() {

    let visit: Visit;
    visit = {
      id: null,
      date: this.date,
      time: this.time,
      doctor: this.doctor,
      user: null
    };
    this.apiService.addVisit(visit)
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.showVisitExistsError = true;
        }
      );
  }

}
