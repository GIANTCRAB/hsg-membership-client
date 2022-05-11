import { BehaviorSubject } from 'rxjs';
import { FormState } from '../shared-interfaces/form-state';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HttpErrorExceptionMessage } from '../shared-interfaces/http-error-exception-message';

export class FormStateManager {
  public static defaultFormState: FormState = {
    isLoading: false,
    isSuccessful: false,
    successMessage: '',
    hasErrors: false,
    errorState: undefined,
  };

  static handleLoading(givenFormState$: BehaviorSubject<FormState>) {
    givenFormState$.next({
      isLoading: true,
      isSuccessful: false,
      successMessage: '',
      hasErrors: false,
      errorState: undefined,
    });
  }

  static handleSuccess(
    givenFormState$: BehaviorSubject<FormState>,
    successMessage: string = 'Successful!'
  ) {
    givenFormState$.next({
      isLoading: false,
      isSuccessful: true,
      successMessage: successMessage,
      hasErrors: false,
      errorState: undefined,
    });
  }

  static handleError(
    givenFormState$: BehaviorSubject<FormState>,
    error: HttpErrorResponse
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
        successMessage: '',
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
        successMessage: '',
        hasErrors: true,
        errorState: {
          statusCode: error.status,
          message: [errorMessage],
        },
      });
    }
  }
}
