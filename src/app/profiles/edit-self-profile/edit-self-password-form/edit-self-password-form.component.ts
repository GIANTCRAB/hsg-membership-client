import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, first } from 'rxjs';
import { FormState } from '../../../shared-interfaces/form-state';
import { FormStateManager } from '../../../shared-classes/form-state-manager';
import { ApiService } from '../../../services/api.service';
import { UserEntity } from '../../../entities/user.entity';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-self-password-form',
  templateUrl: './edit-self-password-form.component.html',
  styleUrls: ['./edit-self-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSelfPasswordFormComponent implements OnInit {
  public readonly editPasswordForm: FormGroup;
  public readonly editPasswordFormState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>(FormStateManager.defaultFormState);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService
  ) {
    this.editPasswordForm = formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_new_password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  editPassword() {
    FormStateManager.handleLoading(this.editPasswordFormState$);

    this.apiService
      .authenticatedPost<UserEntity>(
        '/user-profiles/update-password',
        this.editPasswordForm.getRawValue()
      )
      .pipe(first())
      .subscribe({
        next: () => {
          FormStateManager.handleSuccess(
            this.editPasswordFormState$,
            'Successful! All your sessions has also been logged out.'
          );
        },
        error: (error: HttpErrorResponse) => {
          FormStateManager.handleError(this.editPasswordFormState$, error);
        },
      });
  }

  public passwordComparisonEquality(): boolean {
    return (
      this.editPasswordForm.get('new_password')?.value ===
      this.editPasswordForm.get('confirm_new_password')?.value
    );
  }
}
