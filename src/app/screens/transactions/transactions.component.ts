import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { exhaustMap, forkJoin } from 'rxjs';
import { CONFIRMATION_ACTIONS } from 'src/app/constants/confirmation-actions';
import { IAccount } from 'src/app/interfaces/IAccount';
import { IColumn } from 'src/app/interfaces/IColumn';
import { ITransaction, ITransactionTable } from 'src/app/interfaces/ITransaction';
import { AccountService } from 'src/app/services/accounts/account.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent {
  reject = CONFIRMATION_ACTIONS.REJECT;
  selectedTransaction!: ITransaction;
  selectedTransactions: ITransactionTable[] = [];
  cols!: IColumn[];
  transactionVisible!: boolean;
  transactions!: ITransactionTable[];
  showConfirmationDialog = false;
  editMode = false;

  constructor(
    private messageService: MessageService,
    private sharedService: SharedService,
    private accountService: AccountService,
    private transactionsService: TransactionsService,
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  addTransaction(): void {
    this.transactionVisible = true;
    this.sharedService.setAccount(undefined);
  }

  loadTransactions(): void {
    forkJoin({
      transactionsList: this.transactionsService.list$(),
      accountsList: this.accountService.list$()
    })
      .subscribe(({ transactionsList, accountsList }) => {
        var account!: IAccount | undefined;
        this.transactions = transactionsList.map((item: ITransaction) => {
          if (!account || account.id !== item.id) {
            account = accountsList.find((acc) => acc.id === item.id);
          }
          return {
            ...item,
            accountName: account ? account.name : "",
            categoryName: 'default'
          } as ITransactionTable;
        })
      });
  }

  convertIntoTable(list: ITransaction[]): ITransactionTable[] {
    return list.map((item: ITransaction) => {
      var accountName = '';
      var categoryName = 'default';
      this.accountService.findById$(item.id).subscribe((account) => {
        accountName = account.name;
      });
      return {
        ...item,
        accountName: accountName,
        categoryName: categoryName,
      } as ITransactionTable;
    });
  }

  openDelete(id: string): void {
    const transaction = this.transactions.find(i => i.id === id);
    if (transaction) {
      this.showConfirmationDialog = true;
      this.transactionVisible = false;
      this.selectedTransaction = transaction;
    }
  }

  handleDeleteReturn(action: number): void {
    if (action === CONFIRMATION_ACTIONS.CONFIRM) {
      this.transactionsService.delete$(this.selectedTransaction.id)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: "success",
              summary: "Transaction deleted"
            });
            this.selectedTransaction = {} as ITransaction;
            this.loadTransactions();
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: "error",
              summary: err.message
            })
          }
        })
    }
    this.selectedTransaction = {} as ITransaction;
    this.showConfirmationDialog = false;
  }

  openEdit(id: string): void {
    const transaction = this.transactions.find(i => i.id === id);
    if (transaction) {
      this.sharedService.setTransaction(transaction);
      this.transactionVisible = true;
      this.editMode = true;
      this.showConfirmationDialog = false;
    }
  }

  handleReturn(action: number): void {
    console.log(action === CONFIRMATION_ACTIONS.CONFIRM ? 'confirm' : 'rejected');
    if (action === CONFIRMATION_ACTIONS.CONFIRM) {
      this.loadTransactions();
    }
    this.editMode = false;
    this.transactionVisible = false;
    this.selectedTransaction = {} as ITransaction;
    this.sharedService.setTransaction(undefined);
  }

  transactionToString(): string {
    return `${this.selectedTransaction.payee} at ${this.selectedTransaction.date}`
  }
}
