import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IAccount } from 'src/app/interfaces/IAccount';
import { ITransaction } from 'src/app/interfaces/ITransaction';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private accountSubject: ReplaySubject<IAccount | undefined> = new ReplaySubject<IAccount | undefined>(1);
  private transactionSubject: ReplaySubject<ITransaction | undefined> = new ReplaySubject<ITransaction | undefined>(1);

  setAccount(data: IAccount | undefined): void {
    this.accountSubject.next(data);
  }

  getAccount$(): Observable<IAccount | undefined> {
    return this.accountSubject.asObservable();
  }

  setTransaction(data: ITransaction | undefined): void {
    this.transactionSubject.next(data);
  }

  getTransaction$(): Observable<ITransaction | undefined> {
    return this.transactionSubject.asObservable();
  }
}
