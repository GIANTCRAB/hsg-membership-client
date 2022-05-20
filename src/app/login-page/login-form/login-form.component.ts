import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormStateManager } from '../../shared-classes/form-state-manager';
import { UserTokenDto } from '../user-token-dto';
import { BehaviorSubject, first } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormState } from '../../shared-interfaces/form-state';
import { ApiService } from '../../services/api.service';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
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

  ngOnInit(): void {}

  login() {
    FormStateManager.handleLoading(this.loginFormState$);

    this.apiService
      .post<UserTokenDto>('/user-auth/login', this.loginForm.getRawValue())
      .pipe(first())
      .subscribe({
        next: (result) => {
          FormStateManager.handleSuccess(this.loginFormState$);
          this.userStateService.setToken(result.login_token);
          this.loginForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          FormStateManager.handleError(this.loginFormState$, error);
        },
      });
  }
}
