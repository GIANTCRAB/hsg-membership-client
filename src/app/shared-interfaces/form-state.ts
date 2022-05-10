import { HttpErrorExceptionMessage } from './http-error-exception-message';

export interface FormState {
  isLoading: boolean;
  isSuccessful: boolean;
  hasErrors: boolean;
  errorState?: HttpErrorExceptionMessage;
}
