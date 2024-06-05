import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  protected signUpForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
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
      this.submitted = true;
      alert(JSON.stringify(this.signUpForm.value));
      this.router.navigate(['home'])
    }
  }
}
