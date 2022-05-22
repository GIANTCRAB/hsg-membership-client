import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, first } from 'rxjs';
import { FormState } from '../../shared-interfaces/form-state';
import { FormStateManager } from '../../shared-classes/form-state-manager';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-reset-request-form',
  templateUrl: './password-reset-request-form.component.html',
  styleUrls: ['./password-reset-request-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetRequestFormComponent implements OnInit {
  passwordResetRequestForm: FormGroup;
  passwordResetRequestFormState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>(FormStateManager.defaultFormState);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService
  ) {
    this.passwordResetRequestForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  requestPasswordReset() {
    FormStateManager.handleLoading(this.passwordResetRequestFormState$);
    this.apiService
      .post('/password-resets', this.passwordResetRequestForm.getRawValue())
      .pipe(first())
      .subscribe({
        next: () => {
          FormStateManager.handleSuccess(
            this.passwordResetRequestFormState$,
            'Please check your email for the url and token. '
          );
          this.passwordResetRequestForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          FormStateManager.handleError(
            this.passwordResetRequestFormState$,
            error
          );
        },
      });
  }
}
