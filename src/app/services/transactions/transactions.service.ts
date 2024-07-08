import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/constants/urls';
import { ITransaction, ITransactionRequest } from 'src/app/interfaces/ITransaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  list$(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(
      API_URLS.TRANSACTIONS
    )
  }

  create$(transaction: ITransaction): Observable<void> {
    const request = transaction as ITransactionRequest;

    return this.http.post<void>(
      API_URLS.TRANSACTIONS,
      request
    );
  }

  update$(transaction: ITransaction): Observable<void> {
    const request = transaction as ITransactionRequest;

    return this.http.put<void>(
      API_URLS.TRANSACTIONS,
      request
    );
  }

  delete$(id: string): Observable<void> {
    return this.http.delete<void>(
      `${API_URLS.TRANSACTIONS}/${id}`
    )
  }
}
