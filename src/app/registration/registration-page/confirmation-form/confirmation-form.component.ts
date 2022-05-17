import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, first, Subscription } from 'rxjs';
import { FormState } from '../../../shared-interfaces/form-state';
import { FormStateManager } from '../../../shared-classes/form-state-manager';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirmation-form',
  templateUrl: './confirmation-form.component.html',
  styleUrls: ['./confirmation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationFormComponent implements OnInit {
  confirmationForm: FormGroup;
  confirmationFormState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>(FormStateManager.defaultFormState);
  routeSubscription?: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute
  ) {
    this.confirmationForm = formBuilder.group({
      id: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.confirmationForm.patchValue({ id: params['id'] });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  submitConfirmationForm() {
    FormStateManager.handleLoading(this.confirmationFormState$);
    const confirmationFormValue = this.confirmationForm.getRawValue();
    this.apiService
      .post<any>(
        '/user-email-verifications/' + confirmationFormValue['id'],
        confirmationFormValue
      )
      .pipe(first())
      .subscribe({
        next: () => {
          FormStateManager.handleSuccess(this.confirmationFormState$);
          this.confirmationForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          FormStateManager.handleError(this.confirmationFormState$, error);
        },
      });
  }
}
