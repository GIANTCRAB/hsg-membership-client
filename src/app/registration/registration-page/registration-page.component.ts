import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormState } from '../../shared-interfaces/form-state';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent implements OnInit {
  registrationForm: FormGroup;
  registrationFormState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>({
      isLoading: false,
      isSuccessful: false,
      hasErrors: false,
      errorState: undefined,
    });

  constructor(private readonly formBuilder: FormBuilder) {
    this.registrationForm = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  register() {}
}
