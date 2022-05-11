import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, first } from 'rxjs';
import { FormState } from '../shared-interfaces/form-state';
import { ApiService } from '../services/api.service';
import { LoginTokenEntity } from '../entities/login-token.entity';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStateService } from '../services/user-state.service';
import { FormStateManager } from '../shared-classes/form-state-manager';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loginFormState$: BehaviorSubject<FormState> = new BehaviorSubject<FormState>(
    FormStateManager.defaultFormState
  );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService,
    private readonly userStateService: UserStateService
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.apiService
      .get('/user-auth/csrf-token')
      .pipe(first())
      .subscribe(() => {});
  }

  login() {
    FormStateManager.handleLoading(this.loginFormState$);

    this.apiService
      .post<LoginTokenEntity>('/user-auth/login', this.loginForm.getRawValue())
      .pipe(first())
      .subscribe({
        next: (result) => {
          FormStateManager.handleSuccess(this.loginFormState$);
          this.userStateService.setToken(result);
          this.loginForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          FormStateManager.handleError(this.loginFormState$, error);
        },
      });
  }
}
