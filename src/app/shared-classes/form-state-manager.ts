import { BehaviorSubject } from 'rxjs';
import { FormState } from '../shared-interfaces/form-state';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HttpErrorExceptionMessage } from '../shared-interfaces/http-error-exception-message';

export class FormStateManager {
  static handleSuccess(givenFormState$: BehaviorSubject<FormState>) {
    givenFormState$.next({
      isLoading: false,
      isSuccessful: true,
      hasErrors: false,
      errorState: undefined,
    });
  }

  static handleError(
    error: HttpErrorResponse,
    givenFormState$: BehaviorSubject<FormState>
  ) {
    if (
      error.status === HttpStatusCode.BadRequest ||
      error.status === HttpStatusCode.UnprocessableEntity
    ) {
      const errorMessage: HttpErrorExceptionMessage = error.error;
      // Validation errors
      givenFormState$.next({
        isLoading: false,
        isSuccessful: false,
        hasErrors: true,
        errorState: errorMessage,
      });
    } else {
      let errorMessage = 'Server error, please try again.';
      switch (error.status) {
        case HttpStatusCode.TooManyRequests:
          errorMessage =
            "Please slow down, you're sending too many requests at a time.";
          break;
      }
      givenFormState$.next({
        isLoading: false,
        isSuccessful: false,
        hasErrors: true,
        errorState: {
          status: error.status,
          errors: [{ server: errorMessage }],
        },
      });
    }
  }
}
