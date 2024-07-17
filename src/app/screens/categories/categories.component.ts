import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/interfaces/ICategory';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { MODES } from 'src/app/constants/modes';
import { CONFIRMATION_ACTIONS } from 'src/app/constants/confirmation-actions';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  modes = MODES;
  categories: ICategory[] = [];
  selectedCategory: ICategory = {} as ICategory;
  categoryForm!: FormGroup;
  showConfirmationDialog = false;
  visible = false;

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  create(): void {
    this.selectedCategory = {
      name: "",
      description: "",
      mode: MODES.NEW
    }
    this.visible = true;
  }

  edit(category: ICategory): void {
    this.selectedCategory = category;
    this.selectedCategory.mode = MODES.EDIT;
    this.visible = true;
  }

  openModalDelete(category: ICategory): void {
    this.selectedCategory = category;
    this.selectedCategory.mode = MODES.DELETE;
    this.showConfirmationDialog = true;
  }

  delete(action: number): void {
    if (action === CONFIRMATION_ACTIONS.CONFIRM) {
      if (this.selectedCategory.id) {
        this.categoriesService
          .delete$(this.selectedCategory.id)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: "success",
                summary: "Category deleted"
              });
              this.selectedCategory = {} as ICategory;
              this.loadTransactions();
            },
            error: (err: HttpErrorResponse) => {
              this.messageService.add({
                severity: "error",
                summary: err.message
              });
            }
          });
      }
    }
    this.cancel();
  }

  loadTransactions(): void {
    this.categoriesService.list$().subscribe((categoriesList: ICategory[]) => {
      this.categories = categoriesList;
      this.categories = [...categoriesList, ...categoriesList, ...categoriesList]
    });
  }

  save(): void {
    if (this.selectedCategory.mode === MODES.NEW && !this.selectedCategory.id) {
      this.categoriesService.create$(this.selectedCategory).subscribe({
        next: () => {
          this.messageService.add({
            severity: "sucess",
            summary: "Transaction Created"
          });
          this.selectedCategory = {} as ICategory;
          this.loadTransactions();
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: "error",
            summary: err.message
          });
        }
      });
    } else if (this.selectedCategory.mode === MODES.EDIT && this.selectedCategory.id) {
      this.categoriesService.update$(this.selectedCategory).subscribe({
        next: () => {
          this.messageService.add({
            severity: "sucess",
            summary: "Transaction Updated"
          });
          this.selectedCategory = {} as ICategory;
          this.loadTransactions();
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: "error",
            summary: err.message
          });
        }
      });
    }
    this.cancel();
  }

  cancel() {
    this.visible = false;
    this.showConfirmationDialog = false;
    this.selectedCategory = {} as ICategory;
  }
}

