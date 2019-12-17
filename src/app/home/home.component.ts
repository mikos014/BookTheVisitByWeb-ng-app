import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Visit} from '../models/visit.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filteredSpec = '';
  filteredDateFrom = '';
  filteredDateTo = '';

  isTableVisible = false;
  selectedRow = '';
  // visitz = [{
  //   id: '1',
  //   doctorSpec: 'laryngolog',
  //   doctorName: 'Smith',
  //   visitDate: '20.12.2019',
  //   visitHour: '13:30'
  // },
  // {
  //   id: '132',
  //   doctorSpec: 'pediatra',
  //   doctorName: 'Abc',
  //   visitDate: '20.02.2019',
  //   visitHour: '16:30'
  // },
  // {
  //   id: '1214',
  //   doctorSpec: 'pediatra',
  //   doctorName: 'Abc',
  //   visitDate: '20.02.2019',
  //   visitHour: '16:30'
  // }];

  visits: Visit[];
  abc = '';
  messageToBookingComponent;
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  search() {
    const formData = new FormData();

    if (!this.filteredSpec && !this.filteredDateFrom && !this.filteredDateTo) {
      this.apiService.getUnoccupiedVisits()
        .subscribe((res: any[]) => {
        this.visits = res;
      });
    } else {
      formData.set('spec', this.filteredSpec);
      formData.append('dateFrom', this.filteredDateTo);
      formData.append('dateTo', this.filteredDateTo);

      this.apiService.getUnoccupiedVisitsFiltered(this.filteredSpec, this.filteredDateFrom, this.filteredDateTo)
        .subscribe((data: any[]) => this.visits = data);

    }
    this.isTableVisible = true;
  }

  setClickedRow(index) {
    this.selectedRow = index;
    this.launchBooking(this.selectedRow);
  }

  launchBooking(idView) {
    this.messageToBookingComponent = this.visits[idView].id;
    // odczytaj tabelaZTerminami[i-1] i przekaż
    // let id;
    // id = this.visits.valueOf(idView);
    this.router.navigateByUrl('/bookTheVisit');
  }


  // 1. złożyć obiekt w param do get'a  ok
  // 2. odbiór w visity[]               ok
  // 3.wyświetlenie na w tablicy        ok
  // 4. przekazać dalej w params
}
