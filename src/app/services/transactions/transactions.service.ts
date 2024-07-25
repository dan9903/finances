import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/constants/urls';
import { ITransaction, ITransactionRequest } from 'src/app/interfaces/ITransaction';
import { ITransactionsDashboardRequest, ITransactionsDashboardResponse } from 'src/app/interfaces/ITransactionDashboard';
import { DateUtils } from 'src/app/utils/dateUtils';

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

  listByDateAndAccount$(request: ITransactionsDashboardRequest): Observable<ITransactionsDashboardResponse> {
    let params = new HttpParams();
    params = params.set('accountId', request.accountId);
    params = params.set('startDate', DateUtils.convertToRequest(request.startDate));
    params = params.set('endDate', DateUtils.convertToRequest(request.endDate));

    return this.http.get<ITransactionsDashboardResponse>(
      API_URLS.DASHBOARD,
      { params: params }
    );
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
