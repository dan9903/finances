import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CONFIRMATION_ACTIONS } from 'src/app/constants/confirmation-actions';
import { HTTP_CODES } from 'src/app/constants/http-codes';
import { IAccount } from 'src/app/interfaces/IAccount';
import { IColumn } from 'src/app/interfaces/IColumn';
import { SharedService } from 'src/app/services/shared/shared.service';
import { AccountService } from 'src/app/services/user/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {
  reject = CONFIRMATION_ACTIONS.REJECT;
  accountVisible!: boolean;
  cols!: IColumn[];
  accounts!: IAccount[];
  showConfirmationDialog = false;
  selectedAccount!: IAccount;
  editMode = false;

  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.loadAccounts();
    this.buildTable();
  }

  addAccount(): void {
    this.accountVisible = true;
    this.sharedService.setAccount(undefined);
  }

  buildTable(): void {
    this.cols = [
      { field: 'name', header: 'Name' } as IColumn,
      { field: 'typeAccount', header: 'Type of Account' }
    ]
  }

  loadAccounts(): void {
    this.accountService.list$().subscribe((accountsList: IAccount[]) => {
      this.accounts = accountsList;
    });
  }

  openDelete(id: string): void {
    const account = this.accounts.find(i => i.id === id);
    if (account) {
      this.showConfirmationDialog = true;
      this.accountVisible = false;
      this.selectedAccount = account;
    }
  }

  handleDeleteReturn(action: number): void {
    if (action === CONFIRMATION_ACTIONS.CONFIRM) {
      this.accountService.delete$(this.selectedAccount.id)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: "success",
              summary: "Account deleted"
            });
            this.selectedAccount = {} as IAccount;
            this.loadAccounts();
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: "error",
              summary: err.message
            })
          }
        })
    }
    this.selectedAccount = {} as IAccount;
    this.showConfirmationDialog = false;
  }

  openEdit(id: string): void {
    const account = this.accounts.find(i => i.id === id);
    if (account) {
      this.sharedService.setAccount(account);
      this.accountVisible = true;
      this.editMode = true;
      this.showConfirmationDialog = false;
    }
  }

  handleReturn(action: number): void {
    console.log(action === CONFIRMATION_ACTIONS.CONFIRM ? 'confirm' : 'rejected');
    if (action === CONFIRMATION_ACTIONS.CONFIRM) {
      this.loadAccounts();
    }
    this.editMode = false;
    this.accountVisible = false;
    this.selectedAccount = {} as IAccount;
    this.sharedService.setAccount(undefined);
  }
}
