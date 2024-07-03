import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IAccount } from 'src/app/interfaces/IAccount';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private accountSubject: ReplaySubject<IAccount | undefined> = new ReplaySubject<IAccount | undefined>(1);

  setAccount(data: IAccount | undefined): void {
    this.accountSubject.next(data);
  }

  getAccount$(): Observable<IAccount | undefined> {
    return this.accountSubject.asObservable();
  }
}
