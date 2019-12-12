import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './models/user.model';
import {environment} from '../environments/environment';
import {any} from 'codelyzer/util/function';
import {register} from 'ts-node';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(loginPayload) {
    // const headers = {
    //   Authorization: 'Basic ' + btoa('ai_app_id:ai_app_secret'),
    //   'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    // };
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    };
    return this.http.post(environment.baseUrl + '/login', loginPayload);
      // .do((data: response) => {console.log(data.headers.get('token'))}))
      // .map((response: Response) => <any> response.json())
      // .catch(this.handleError);
  }

  register(data) {
    return this.http.post(environment.baseUrl + '/register', data);
  }

  getUsers() {
    return this.http.get(environment.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  // getUserById(id: number) {
  //   return this.http.get(environment.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  // }
  //
  createUser(user: User) {
    return this.http.post(environment.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, user);
  }
  //
  // updateUser(newUserData: User) {
  //   return this.http.put(environment.baseUrl + 'user/' + newUserData + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, newUserData);
  // }

  // deleteUser(id: number) {
  //   return this.http.delete(environment.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  // }
}
