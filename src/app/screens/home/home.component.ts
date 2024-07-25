import { Component } from '@angular/core';
import { IKeyValue } from 'src/app/interfaces/IKeyValue';
import { AccountService } from 'src/app/services/accounts/account.service';
import { StorageService } from 'src/app/services/shared/storage.service';

const allAccounts = { key: "all", value: "All Accounts" } as IKeyValue;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  username!: string;

  selectedAccount: IKeyValue = allAccounts;
  rangeDates: Date[] = [];
  accounts: IKeyValue[] = [allAccounts];

  constructor(
    private accountService: AccountService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    const today = new Date();
    const previousMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    this.rangeDates?.push(previousMonth, today);

    this.accountService.listToDropDown$()
      .subscribe((accounts) => {
        this.accounts = [...this.accounts, ...accounts];
      });

    const user = this.storageService.getUser();
    if (user !== null) {
      this.username = user.name;
    }
  }
}
