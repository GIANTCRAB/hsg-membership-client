import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { FormState } from '../../shared-interfaces/form-state';
import { FormStateManager } from '../../shared-classes/form-state-manager';

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
      id: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      new_password: ['', [Validators.required]],
      confirm_new_password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.passwordResetForm.patchValue({ id: this.passwordResetId });
  }

  resetPassword() {}
}
