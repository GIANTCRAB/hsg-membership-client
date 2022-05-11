import { HttpStatusCode } from '@angular/common/http';

export interface HttpErrorExceptionMessage {
  statusCode: HttpStatusCode;
  message: string[];
  error?: string;
}
