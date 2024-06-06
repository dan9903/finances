import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly USER_KEY = 'auth-user';

  saveUser(user: IUser): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY,
      JSON.stringify(user))
  }

  getUser(): IUser | null {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    return user !== null;
  }

  clear(): void {
    window.sessionStorage.clear();
  }
}
