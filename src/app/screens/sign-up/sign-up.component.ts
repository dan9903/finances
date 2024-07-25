import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HTTP_CODES } from 'src/app/constants/http-codes';
import { IRegistrationRequest, IRegistrationResponse } from 'src/app/interfaces/IRegistration';
import { IUserDetail } from 'src/app/interfaces/IUser';
import { StorageService } from 'src/app/services/shared/storage.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { passwordMatchValidator } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  protected signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.signUpForm = this.formBuilder.group({
      username: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12)
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
      passwordConfirmation: ['',
        [
          Validators.required,
          Validators.minLength(8),
        ]
      ],
    },
      {
        validators: [
          passwordMatchValidator()
        ]
      });
  }

  clear() {
    this.signUpForm.reset();

  }

  onSubmit() {
    if (this.signUpForm?.valid) {
      const req: IRegistrationRequest = {
        username: this.signUpForm.get('username')?.value,
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value
      }
      this.authService.signup$(req)
        .subscribe({
          next: (res: IRegistrationResponse) => {
            this.storageService.saveUser(res as IUserDetail);
            this.messageService.add({
              severity: 'success',
              summary: 'Account created!',
              detail: 'Go to settings, for complete your profile',
              key: 'home'
            });
            this.router.navigate(['home']);
          },
          error: (error: HttpErrorResponse) => {
            if (
              error.status === HTTP_CODES.BAD_REQUEST ||
              error.status === HTTP_CODES.REQUEST_TIMEOUT ||
              error.status === HTTP_CODES.NOT_FOUND
            ) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error we cannot create your user: ',
                detail: error.message
              });
            }
          }
        });
    }
  }
}
