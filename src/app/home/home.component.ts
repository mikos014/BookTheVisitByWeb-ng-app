import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
  visits = [{
    id: '1',
    doctorSpec: 'laryngolog',
    doctorName: 'Smith',
    visitDate: '20.12.2019',
    visitHour: '13:30'
  },
  {
    id: '132',
    doctorSpec: 'pediatra',
    doctorName: 'Abc',
    visitDate: '20.02.2019',
    visitHour: '16:30'
  },
  {
    id: '1214',
    doctorSpec: 'pediatra',
    doctorName: 'Abc',
    visitDate: '20.02.2019',
    visitHour: '16:30'
  }];
  abc = '';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  search() {
    // if (this.filteredSpec !== 'abc') {
      this.isTableVisible = true;
    // }
  }
  setClickedRow(index) {
    this.selectedRow = index;
    this.launchBooking(this.selectedRow);
  }

  launchBooking(idView) {
    // odczytaj tabelaZTerminami[i-1] i przekaż
    // let id;
    // id = this.visits.valueOf(idView);

    this.router.navigate(['/addVisit'], );
  }
}
