import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import 'rxjs-compat/add/operator/map';
import {Visit} from '../models/visit.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

interface VisitResponse {
  visits: Array<Visit>;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(loginPayload) {

    return this.http.post(environment.baseUrl + '/login', loginPayload, { observe: 'response' })
      .map(res => res.status);
      // .map(response => console.log(response.status));
  }

  register(data) {
    return this.http.post(environment.baseUrl + '/register', data);
  }

  editData(data) {
    return this.http.post(environment.baseUrl + '/api/editData', data);
  }

  getDoctors() {
    return this.http.get(environment.baseUrl + '/api/doctors');
  }

  getDoctorsBySpec(spec) {

  }

  getUnoccupiedVisits() {
    return this.http.get<Visit[]>(environment.baseUrl + '/api/showVisits');
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
