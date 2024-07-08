import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/constants/urls';
import { IAccount, IAccountRequest } from 'src/app/interfaces/IAccount';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  list$(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(
      API_URLS.ACCOUNTS
    )
  }

  findById$(id: string): Observable<IAccount> {
    return this.http.get<IAccount>(
      `${API_URLS.ACCOUNTS}/${id}`
    );
  }

  create$(name: string, typeAccount: string): Observable<void> {
    const request = {
      name: name,
      typeAccount: typeAccount
    } as IAccountRequest;

    return this.http.post<void>(
      API_URLS.ACCOUNTS,
      request
    );
  }

  update$(id: string, name: string, typeAccount: string): Observable<void> {
    const request = {
      id: id,
      name: name,
      typeAccount: typeAccount
    } as IAccountRequest;

    return this.http.put<void>(
      API_URLS.ACCOUNTS,
      request
    );
  }

  delete$(id: string): Observable<void> {
    return this.http.delete<void>(
      `${API_URLS.ACCOUNTS}/${id}`
    )
  }
}
