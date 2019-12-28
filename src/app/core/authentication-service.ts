import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import 'rxjs-compat/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    const credentials = {email, password};
    const options = {responseType: 'text' as 'json'};
    // console.log('Trying to authenticate.');
    return this.http.post<any>(environment.baseUrl + '/login', credentials, { observe: 'response' }).pipe(
      map(
        data => data.headers.get('Role') + '-' + data.headers.get('Authorization'),
      ),
      catchError((err: HttpErrorResponse) => {
        return throwError(err.error.message);
      })
    );
  }

  register(email: string, name: string, surname: string, password: string): Observable<any> {
    const signUpForm = {email, name, surname, password};
    const options = {responseType: 'text' as 'json'};
    return this.http.post<any>(environment.baseUrl + '/register', signUpForm).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err.error.message);
      })
    );
  }

}
