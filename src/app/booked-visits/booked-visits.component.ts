import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booked-visits',
  templateUrl: './booked-visits.component.html',
  styleUrls: ['./booked-visits.component.css']
})
export class BookedVisitsComponent implements OnInit {

  visits = [{
    doctorSpec: 'laryngolog',
    doctorName: 'Smith',
    visitDate: '20.12.2019',
    visitHour: '13.30'
  },
    {
      doctorSpec: 'pediatra',
      doctorName: 'Abc',
      visitDate: '20.02.2019',
      visitHour: '16.30'
    },
    {
      doctorSpec: 'pediatra',
      doctorName: 'Abc',
      visitDate: '20.02.2019',
      visitHour: '16.30'
    }];
  constructor() { }

  ngOnInit() {
  }

}
