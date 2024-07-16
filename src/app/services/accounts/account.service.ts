import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URLS } from 'src/app/constants/urls';
import { IAccount, IAccountRequest } from 'src/app/interfaces/IAccount';
import { IKeyValue } from 'src/app/interfaces/IKeyValue';

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

  listToDropDown$(): Observable<IKeyValue[]> {
    return this.list$().pipe(
      map((accounts: IAccount[]) => {
        return accounts.map(item => {
          return {
            key: item.id,
            value: item.name
          } as IKeyValue;
        });
      })
    );
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
