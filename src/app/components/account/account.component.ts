import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAccount } from '../../interfaces/IAccount';
import { AccountService } from 'src/app/services/accounts/account.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CONFIRMATION_ACTIONS } from 'src/app/constants/confirmation-actions';
import { NATURES } from 'src/app/constants/natures';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  reject = CONFIRMATION_ACTIONS.REJECT;
  account!: IAccount;
  editMode = false;
  accountForm!: FormGroup;
  natures = NATURES;

  @Output()
  onClose = new EventEmitter<number>();

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService,
    private sharedService: SharedService
  ) { }

  onSubmit() {
    if (this.accountForm?.valid) {
      const name = this.accountForm.get('name')?.value;
      const nature = this.accountForm.get('nature')?.value;

      if (this.editMode) {
        this.accountService.update$(this.account.id, name, nature)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Account Updated!'
              })
              this.close(CONFIRMATION_ACTIONS.CONFIRM);
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

      this.accountService.create$(name, nature)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Account Created!'
            });
            this.close(CONFIRMATION_ACTIONS.CONFIRM);
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
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.sharedService.getAccount$().subscribe((account) => {
      if (account) {
        this.editMode = true;
        this.accountForm.get('name')?.setValue(account.name);
        this.accountForm.get('nature')?.setValue(account.nature);
        this.account = account;
      }
    });
  }

  close(action: number): void {
    this.account = {} as IAccount;
    this.accountForm.reset();
    this.editMode = false;
    this.onClose.next(action);
  }

  buildForm(): void {
    const pattern = `[${this.natures.map((i) => i.key.toString())}]`
    this.accountForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      nature: new FormControl('', [
        Validators.required,
        Validators.pattern(pattern)
      ])
    });
  }
}
