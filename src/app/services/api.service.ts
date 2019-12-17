import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import 'rxjs-compat/add/operator/map';
import {Visit} from '../models/visit.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs-compat/add/operator/catch';
import {any} from 'codelyzer/util/function';
import {User} from '../models/user.model';
import {TokenStorage} from '../core/token-storage';

// interface VisitResponse {
//   visits: Array<Visit>;
// }

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token: string;

  header = new HttpHeaders({
    Authorization: this.token,
  });

  constructor(private http: HttpClient) { }

  // static handleError(error) {
  //   let errorMessage: any;
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `${error.error.message.status}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `${error.status}`;
  //   }
  //   return errorMessage;
  // }

  // login(loginPayload) {
  //
  //   return this.http.post(environment.baseUrl + '/login', loginPayload, { observe: 'response' })
  //     // .map(res => res.status)
  //     .map((data: any) => {
  //       this.token = data.headers.get('Authorization');
  //       console.log(this.token);
  //       return data.status;
  //     })
  //     .catch(ApiService.handleError);
  // }
  //
  // register(data) {
  //   return this.http.post(environment.baseUrl + '/register', data, { observe: 'response' })
  //     .map(res => res.status)
  //     .catch(ApiService.handleError);
  // }
  //
  // logout() {
  //   return this.http.post(environment.baseUrl + '/logout', { headers: this.header, observe: 'response' })
  //     .map(res => any)
  //     .catch(ApiService.handleError);
  // }
  // getUnoccupiedVisitsFiltered(formData) {
  //   return this.http.get<Visit[]>(environment.baseUrl + '/showVisits', formData);
  // }

  // ***działa
  // editData(data): Observable<any> {
  //   return this.http.post<any>(environment.ApiUrl + '/editData/' + data, { headers: this.header })
  //     .map(res => res.json())
  //     .catch(ApiService.handleError);
  // }
  //
  // getUnoccupiedVisits() {
  //   return this.http.get<Visit[]>(environment.ApiUrl + '/showVisits', { headers: this.header });
  // }
  //
  // getUnoccupiedVisitsFiltered(spec, dateFrom, dateTo) {
  //   const param = new HttpParams().set('spec', spec).set('dateFrom', dateFrom).set('dateTo', dateTo);
  //   return this.http.get<Visit[]>(environment.ApiUrl + '/showVisits', { headers: this.header, params: param});
  // }
  //
  // bookTheVisit(id) {
  //   const param = new HttpParams().set('idVisit', id);
  //   return this.http.post(environment.ApiUrl + '/showVisits', { headers: this.header, params: param});
  // }
  //
  // getMyVisits() {
  //   return this.http.get<Visit[]>(environment.ApiUrl + '/showVisits', { headers: this.header });
  // }

  /******* test ******/
  // abc() {
  //   return this.http.get(environment.baseUrl + '/api/abc', { headers: this.header, observe: 'response'})
  //     .map(res => res.status)
  //     .catch(ApiService.handleError);
  // }

  editData(user: User): Observable<User> {
    return this.http.post<User>(environment.ApiUrl + '/editData', user);
  }
  getUnoccupiedVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(environment.ApiUrl + '/showVisits');
  }


  // getUnoccupiedVisitsFiltered(formData) {
  //   return this.http.get<Visit[]>(environment.baseUrl + '/showVisits', formData);
  // }

  getUnoccupiedVisitsFiltered(spec: string, dateFrom: any, dateTo: any): Observable<Visit[]> {
    // const param = new HttpParams().set('spec', spec).set('dateFrom', dateFrom).set('dateTo', dateTo);
    return this.http.get<Visit[]>(environment.ApiUrl + '/showVisits/' + spec + '/' + dateFrom + '/' + dateTo);
  }

  bookTheVisit(id): Observable<any> {
    return this.http.post(environment.ApiUrl + '/addVisit/' + id, null);
  }

  getMyVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(environment.ApiUrl + '/showMyVisits');
  }

  abc(): Observable<any> {
    return this.http.get<any>(environment.ApiUrl + '/abc');
  }
}
