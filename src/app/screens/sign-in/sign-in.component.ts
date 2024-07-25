import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HTTP_CODES } from 'src/app/constants/http-codes';
import { ILoginRequest, ILoginResponse } from 'src/app/interfaces/ILogin';
import { IUserDetail } from 'src/app/interfaces/IUser';
import { StorageService } from 'src/app/services/shared/storage.service';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  protected loginForm!: FormGroup;

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
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      rememberme: new FormControl(false)
    });
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      const req: ILoginRequest = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.authService.login$(req).subscribe({
        next: (resp: ILoginResponse) => {
          this.storageService.saveUser(resp as IUserDetail);

          this.messageService.add({
            severity: 'success',
            summary: 'Successful login',
            key: 'home'
          });

          this.router.navigate(['home']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === HTTP_CODES.UNAUTHORIZED) {
            this.messageService.add({
              severity: 'error',
              summary: 'Oops, your login attempt have an error',
              detail: 'Verify your password and username'
            })
          }
        }
      });
    }
  }
}

