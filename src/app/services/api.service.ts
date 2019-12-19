import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import 'rxjs-compat/add/operator/map';
import {Visit} from '../models/visit.model';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs-compat/add/operator/catch';
import {User} from '../models/user.model';
import {Doctor} from '../models/doctor.model';
import {DateFilter} from '../models/date-filter.model';

// interface VisitResponse {
//   visits: Array<Visit>;
// }

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private messageSource = new BehaviorSubject<number>(-1);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  changeMessage(message: number) {
    this.messageSource.next(message);
  }

  editData(user: User): Observable<User> {
    return this.http.post<User>(environment.ApiUrl + '/editData', user);
  }
  getUnoccupiedVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(environment.ApiUrl + '/getVisits');
  }

  getUnoccupiedVisitsFiltered(dateFilter: DateFilter): Observable<Visit[]> {
    // const param = new HttpParams().set('spec', spec).set('dateFrom', dateFrom).set('dateTo', dateTo);
    return this.http.post<Visit[]>(environment.ApiUrl + '/getVisitsFiltered/', dateFilter);
  }

  getMyVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(environment.ApiUrl + '/getMyVisits');
  }

  getVisitById(id: number): Observable<Visit> {
    return this.http.get<Visit>(environment.ApiUrl + '/getVisit/' + id);
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(environment.ApiUrl + '/getDoctors');
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(environment.ApiUrl + '/getDoctorById/' + id);
  }

  getDoctorsFiltered(doctor: Doctor): Observable<Doctor[]> {
    return this.http.post<Doctor[]>(environment.ApiUrl + '/getDoctorsFiltered', doctor);
  }

  bookTheVisit(id): Observable<any> {
    return this.http.post<any>(environment.ApiUrl + '/addVisit/' + id, null);
  }

  abc(): Observable<any> {
    return this.http.get<any>(environment.ApiUrl + '/abc');
  }
}
