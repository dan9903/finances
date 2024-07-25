import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule } from '@angular/forms';
import { AccountService } from 'src/app/services/accounts/account.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CONFIRMATION_ACTIONS } from 'src/app/constants/confirmation-actions';
import { IKeyValue } from 'src/app/interfaces/IKeyValue';
import { NATURES, NatureEnum } from 'src/app/constants/natures';
import { ITransaction } from 'src/app/interfaces/ITransaction';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html'
})
export class TransactionManagementComponent implements OnInit {
  reject = CONFIRMATION_ACTIONS.REJECT;
  transaction!: ITransaction;
  editMode = false;
  transactionForm!: FormGroup;
  natures = NATURES.filter((i) => i.key !== NatureEnum.BOTH.key);
  categories: IKeyValue[] = [];
  accounts: IKeyValue[] = [];
  date!: Date;

  @Output()
  onClose = new EventEmitter<number>();

  constructor(
    private formBuilder: FormBuilder,
    private accountsService: AccountService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private sharedService: SharedService,
    private transactionsService: TransactionsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  onSubmit() {
    if (this.transactionForm?.valid) {
      const transaction = {
        date: this.transactionForm.get('trDate')?.value,
        category: this.transactionForm.get('category')?.value,
        payee: this.transactionForm.get('payee')?.value,
        amount: this.transactionForm.get('amount')?.value,
        account: this.transactionForm.get('account')?.value,
        nature: this.transactionForm.get('nature')?.value,
        notes: this.transactionForm.get('notes')?.value,
      } as ITransaction;

      if (this.editMode) {
        transaction.id = this.transaction.id,
          this.transactionsService.update$(transaction)
            .subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Transaction Updated!'
                })
                this.close(CONFIRMATION_ACTIONS.CONFIRM);
                this.router.navigate(['transactions'])
              },
              error: (err: HttpErrorResponse) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Something went wrong',
                  detail: err.message
                })
                this.close(CONFIRMATION_ACTIONS.REJECT);
              }
            });
        return;
      }

      this.transactionsService.create$(transaction)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Transaction Created!'
            });
            this.close(CONFIRMATION_ACTIONS.CONFIRM);
            this.router.navigate(['transactions'])
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong',
              detail: err.message
            });
            this.close(CONFIRMATION_ACTIONS.REJECT);
          }
        });
      void this.router.navigate(['/transactions'])
    }
  }

  ngOnInit(): void {
    this.buildForm();

    this.accountsService.listToDropDown$().subscribe((accounts) => {
      this.accounts = accounts;
    });

    this.categoriesService.listToDropdown$().subscribe((categories) => {
      this.categories = categories;
    });

    this.sharedService.getTransaction$().subscribe((transaction) => {
      if (transaction) {
        this.editMode = true;
        this.date = transaction.date;
        this.transactionForm.get('trDate')?.setValue(transaction.date);
        this.transactionForm.get('account')?.setValue(transaction.account);
        this.transactionForm.get('category')?.setValue(transaction.category);
        this.transactionForm.get('payee')?.setValue(transaction.payee);
        this.transactionForm.get('amount')?.setValue(transaction.amount);
        this.transactionForm.get('nature')?.setValue(transaction.nature);
        this.transactionForm.get('notes')?.setValue(transaction.notes);
        this.transaction = transaction;
        this.cdr.detectChanges();
      }
    });
  }

  close(action: number): void {
    this.transaction = {} as ITransaction;
    this.transactionForm.reset();
    this.editMode = false;
    this.onClose.next(action);
    void this.router.navigate(['/transactions']);
  }

  buildForm(): void {
    const pattern = `[${this.natures.map((i) => i.key.toString())}]`
    this.transactionForm = this.formBuilder.group({
      trDate: new FormControl<Date>(new Date(), [
        Validators.required,
        Validators.nullValidator
      ]),
      category: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      account: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      payee: new FormControl<string | null>('', [
        Validators.maxLength(50)
      ]),
      amount: new FormControl<number | null>(0, [
        Validators.required
      ]),
      nature: new FormControl<string>('', [
        Validators.required,
        Validators.pattern(pattern)
      ]),
      notes: new FormControl<string | null>('', [
        Validators.maxLength(300)
      ])
    });
    this.cdr.detectChanges();
  }
}
