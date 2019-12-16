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

  token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmMiLCJleHAiOjE1NzY1MjY3MjR9.naIHC8lU17yzfr4EgH8TQxkgu_aCj4LsVZdE5WDOD7RFrYZZFKoFG0lSKZjDkJkLVaeTtjT7n53BwZjp6Y7DLg';

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
        console.log(this.token + ' abc ' + ' de ' + data.headers);
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
    return this.http.post(environment.baseUrl + '/logout', { observe: 'response' })
      .map(res => any)
      .catch(ApiService.handleError);
  }

  editData(data) {
    return this.http.post(environment.baseUrl + '/api/editData', data, { observe: 'response' })
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
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token
    });
    const httpOptions = {
      headers: header
    };
    return this.http.get<Visit[]>(environment.baseUrl + '/api/showVisits', httpOptions);
  }


  // getUnoccupiedVisitsFiltered(formData) {
  //   return this.http.get<Visit[]>(environment.baseUrl + '/api/showVisits', formData);
  // }

  getUnoccupiedVisitsFiltered(spec, dateFrom, dateTo) {
    const params = new HttpParams().set('spec', spec).set('dateFrom', dateFrom).set('dateTo', dateTo);
    return this.http.get(environment.baseUrl + '/api/showVisits', {params});
  }

  bookTheVisit(id) {
    const params = new HttpParams().set('idVisit', id);
    return this.http.post(environment.baseUrl + '/api/showVisits', {params});
  }

  getMyVisits() {
    return this.http.get<Visit[]>(environment.baseUrl + '/api/showVisits');
  }

  /******* test ******/
  abc() {
    return this.http.get(environment.baseUrl + '/api/abc', { observe: 'response' });
  }




  getUsers() {
    return this.http.get(environment.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  // getUserById(id: number) {
  //   return this.http.get(environment.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  // }
  //
  // createUser(user: User) {
  //   return this.http.post(environment.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, user);
  // }
  //
  // updateUser(newUserData: User) {
  //   return this.http.put(environment.baseUrl + 'user/' + newUserData + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, newUserData);
  // }

  // deleteUser(id: number) {
  //   return this.http.delete(environment.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  // }
}
