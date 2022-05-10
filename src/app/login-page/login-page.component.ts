import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, first } from 'rxjs';
import { FormState } from '../shared-interfaces/form-state';
import { ApiService } from '../services/api.service';
import { LoginTokenEntity } from '../entities/login-token.entity';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loginFormState$: BehaviorSubject<FormState> = new BehaviorSubject<FormState>({
    isLoading: false,
    isSuccessful: false,
    hasErrors: false,
    errors: [],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    this.loginFormState$.next({
      isLoading: true,
      isSuccessful: false,
      hasErrors: false,
      errors: [],
    });

    this.apiService
      .post<LoginTokenEntity>('/user-auth/login', this.loginForm.getRawValue())
      .pipe(first())
      .subscribe({
        next: (result) => {
          this.loginFormState$.next({
            isLoading: false,
            isSuccessful: true,
            hasErrors: false,
            errors: [],
          });
        },
        error: (error: HttpErrorResponse) => {
          if (
            error.status === HttpStatusCode.BadRequest ||
            error.status === HttpStatusCode.UnprocessableEntity
          ) {
            // Validation errors
            this.loginFormState$.next({
              isLoading: false,
              isSuccessful: false,
              hasErrors: true,
              errors: [error.error.message],
            });
          } else {
            this.loginFormState$.next({
              isLoading: false,
              isSuccessful: false,
              hasErrors: true,
              errors: ['Server error, please try again.'],
            });
          }
        },
      });
  }
}
