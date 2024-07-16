import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { CONFIRMATION_ACTIONS } from 'src/app/constants/confirmation-actions';
import { IAccount } from 'src/app/interfaces/IAccount';
import { IColumn } from 'src/app/interfaces/IColumn';
import { Router } from '@angular/router';
import { ITransaction, ITransactionTable } from 'src/app/interfaces/ITransaction';
import { AccountService } from 'src/app/services/accounts/account.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ICategory } from 'src/app/interfaces/ICategory';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {
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
    private categoriesService: CategoriesService,
    private transactionsService: TransactionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  addTransaction(): void {
    this.transactionVisible = true;
    this.sharedService.setTransaction(undefined);
    this.router.navigate(['transaction-management']);
  }

  loadTransactions(): void {
    forkJoin({
      transactionsList: this.transactionsService.list$(),
      accountsList: this.accountService.list$(),
      categoriesList: this.categoriesService.list$(),
    })
      .subscribe(({ transactionsList, accountsList, categoriesList }) => {
        var account!: IAccount | undefined;
        var category!: ICategory | undefined;
        this.transactions = transactionsList.map((item: ITransaction) => {
          if (!account || account.id !== item.account) {
            account = accountsList.find((acc) => acc.id === item.account);
          }
          if (!category || category.id !== item.category) {
            category = categoriesList.find((cat) => cat.id === item.category);
          }
          return {
            ...item,
            accountName: account ? account.name : "",
            categoryName: category ? category.name : "",
          } as ITransactionTable;
        })
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
      this.router.navigate(['transaction-management']);
    }
  }

  handleReturn(action: number): void {
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
