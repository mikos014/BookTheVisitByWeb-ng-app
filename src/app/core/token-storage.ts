import {Injectable} from '@angular/core';

const TOKEN_KEY = 'Authorization';
const USER_ROLE = 'Role';

@Injectable()
export class TokenStorage {
  constructor() { }

  logOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    console.log(token);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveRole(role: string) {
    console.log(role);
    window.sessionStorage.getItem(USER_ROLE);
    window.sessionStorage.setItem(USER_ROLE, role);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isAdmin(): boolean {
    return sessionStorage.getItem(USER_ROLE) === 'Admin';
  }

  public isUserSignedIn(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  reloadPage(): void {
    window.location.reload();
  }
}
