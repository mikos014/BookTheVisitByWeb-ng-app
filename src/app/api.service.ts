import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './models/user.model';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(loginPayload) {
    const headers = {
      Authorization: 'Basic ' + btoa('mikolaj-client:mikolaj-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(environment.baseUrl + '/login', loginPayload);
  }

  getUsers() {
    return this.http.get(environment.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  getUserById(id: number) {
    return this.http.get(environment.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  createUser(user: User) {
    return this.http.post(environment.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, user);
  }

  updateUser(newUserData: User) {
    return this.http.put(environment.baseUrl + 'user/' + newUserData + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, newUserData);
  }

  // deleteUser(id: number) {
  //   return this.http.delete(environment.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  // }
}
