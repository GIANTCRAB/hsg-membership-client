import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject, first } from 'rxjs';
import { FormState } from '../../shared-interfaces/form-state';
import { FormStateManager } from '../../shared-classes/form-state-manager';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent implements OnInit {
  @Input()
  passwordResetId: string = '';
  passwordResetForm: FormGroup;
  passwordResetFormState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>(FormStateManager.defaultFormState);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService
  ) {
    this.passwordResetForm = formBuilder.group({
      code: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      new_password: ['', [Validators.required]],
      confirm_new_password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  public passwordComparisonEquality(): boolean {
    return (
      this.passwordResetForm.get('new_password')?.value ===
      this.passwordResetForm.get('confirm_new_password')?.value
    );
  }

  resetPassword() {
    FormStateManager.handleLoading(this.passwordResetFormState$);
    const passwordResetForm = this.passwordResetForm.getRawValue();
    this.apiService
      .post('/password-resets/' + this.passwordResetId, passwordResetForm)
      .pipe(first())
      .subscribe({
        next: () => {
          FormStateManager.handleSuccess(this.passwordResetFormState$);
          this.passwordResetForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          FormStateManager.handleError(this.passwordResetFormState$, error);
        },
      });
  }
}
