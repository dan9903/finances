import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CONFIRMATION_ACTIONS } from 'src/app/constants/confirmation-actions';
import { IAccount } from 'src/app/interfaces/IAccount';
import { SharedService } from 'src/app/services/shared/shared.service';
import { AccountService } from 'src/app/services/accounts/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {
  reject = CONFIRMATION_ACTIONS.REJECT;
  accountVisible!: boolean;
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
  }

  addAccount(): void {
    this.accountVisible = true;
    this.sharedService.setAccount(undefined);
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
    if (action === CONFIRMATION_ACTIONS.CONFIRM) {
      this.loadAccounts();
    }
    this.editMode = false;
    this.accountVisible = false;
    this.selectedAccount = {} as IAccount;
    this.sharedService.setAccount(undefined);
  }
}
