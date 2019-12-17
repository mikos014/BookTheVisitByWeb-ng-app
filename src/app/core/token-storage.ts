import {Injectable} from '@angular/core';

const TOKEN_KEY = 'Authorization';

@Injectable()
export class TokenStorage {
  constructor() { }

  logOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
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
