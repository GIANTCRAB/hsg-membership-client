import { HttpErrorExceptionMessage } from './http-error-exception-message';

export interface FormState {
  isLoading: boolean;
  isSuccessful: boolean;
  successMessage: string;
  hasErrors: boolean;
  errorState?: HttpErrorExceptionMessage;
}
