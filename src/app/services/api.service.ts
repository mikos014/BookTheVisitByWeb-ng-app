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

// interface VisitResponse {
//   visits: Array<Visit>;
// }

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token;

  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token
  });

  constructor(private http: HttpClient) { }

  static handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `${error.error.message.status}`;
    } else {
      // server-side error
      errorMessage = `${error.status}`;
    }
    return errorMessage;
  }

  login(loginPayload) {

    return this.http.post(environment.baseUrl + '/login', loginPayload, { observe: 'response' })
      // .map(res => res.status)
      .map((data: any) => {
        this.token = data.headers.get('Authorization');
        console.log(this.token + ' abc ' + ' de ' + data.status);
        return data.status;
      })
      .catch(ApiService.handleError);
  }

  register(data) {
    return this.http.post(environment.baseUrl + '/register', data, { observe: 'response' })
      .map(res => res.status)
      .catch(ApiService.handleError);
  }

  logout() {
    return this.http.post(environment.baseUrl + '/logout', { headers: this.header, observe: 'response' })
      .map(res => any)
      .catch(ApiService.handleError);
  }

  editData(data) {
    return this.http.post(environment.baseUrl + '/api/editData', data, { headers: this.header, observe: 'response' })
      .map(res => res.status)
      .catch(ApiService.handleError);
  }

  // getDoctors() {
  //   return this.http.get(environment.baseUrl + '/api/doctors');
  // }
  //
  // getDoctorsBySpec(spec) {
  //
  // }

  getUnoccupiedVisits() {
    return this.http.get<Visit[]>(environment.baseUrl + '/api/showVisits', { headers: this.header });
  }


  // getUnoccupiedVisitsFiltered(formData) {
  //   return this.http.get<Visit[]>(environment.baseUrl + '/api/showVisits', formData);
  // }

  getUnoccupiedVisitsFiltered(spec, dateFrom, dateTo) {
    const param = new HttpParams().set('spec', spec).set('dateFrom', dateFrom).set('dateTo', dateTo);
    return this.http.get<Visit[]>(environment.baseUrl + '/api/showVisits', { headers: this.header, params: param});
  }

  bookTheVisit(id) {
    const param = new HttpParams().set('idVisit', id);
    return this.http.post(environment.baseUrl + '/api/showVisits', { headers: this.header, params: param});
  }

  getMyVisits() {
    return this.http.get<Visit[]>(environment.baseUrl + '/api/showVisits', { headers: this.header });
  }

  /******* test ******/
  abc() {
    return this.http.get(environment.baseUrl + '/api/abc', { observe: 'response' })
      .map(res => res.status)
      .catch(ApiService.handleError);
  }

}
