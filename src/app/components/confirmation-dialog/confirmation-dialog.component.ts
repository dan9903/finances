import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { CONFIRMATION_ACTIONS } from '../../constants/confirmation-actions';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent implements OnInit {
  @Input({ required: true })
  itemName!: string;

  @Output()
  confirmationAction = new EventEmitter<number>();

  constructor(
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: `Delete the item ${this.itemName} ?`,
      accept: () => {
        this.confirmationAction.next(CONFIRMATION_ACTIONS.CONFIRM);
      },
      reject: () => {
        this.confirmationAction.next(CONFIRMATION_ACTIONS.REJECT);
      }
    });
  }
}
