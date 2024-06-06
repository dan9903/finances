import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HTTP_CODES } from 'src/app/constants/http-codes';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  protected recoverForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.recoverForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    });
  }

  onSubmit() {
    if (this.recoverForm?.valid) {
      const email = this.recoverForm.get('email')?.value;
      this.authService.fogotPassword(email)
        .subscribe({
          next: (res: HttpHeaderResponse) => {
            if (res.status === HTTP_CODES.SUCCESS) {
              this.messageService.add({
                severity: 'success',
                summary: 'The email was sent',
                detail: 'We send a email to your account with a provisory password'
              });

              this.router.navigate(['sign-in'])
            }
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === HTTP_CODES.BAD_REQUEST) {
              this.messageService.add({
                severity: 'error',
                summary: 'The email does not exist into our database',
                detail: 'Verify the email, and try again'
              });
            }
          }
        })

    }
  }

}
