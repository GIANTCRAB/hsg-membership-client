import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, first } from 'rxjs';
import { FormState } from '../../shared-interfaces/form-state';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormStateManager } from '../../shared-classes/form-state-manager';
import { UserEntity } from '../../entities/user.entity';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent implements OnInit {
  registrationForm: FormGroup;
  registrationFormState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>(FormStateManager.defaultFormState);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService
  ) {
    this.registrationForm = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.apiService
      .get('/user-auth/csrf-token')
      .pipe(first())
      .subscribe(() => {});
  }

  register() {
    FormStateManager.handleLoading(this.registrationFormState$);

    this.apiService
      .post<UserEntity>(
        '/user-registration',
        this.registrationForm.getRawValue()
      )
      .pipe(first())
      .subscribe({
        next: () => {
          FormStateManager.handleSuccess(
            this.registrationFormState$,
            'Successful! Please check your email and validate your identity.'
          );
          this.registrationForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          FormStateManager.handleError(this.registrationFormState$, error);
        },
      });
  }
}
