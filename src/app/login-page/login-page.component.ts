import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormState } from '../shared-interfaces/form-state';

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

  constructor(private readonly formBuilder: FormBuilder) {
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
  }
}
