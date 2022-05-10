import { HttpStatusCode } from '@angular/common/http';

export interface HttpErrorExceptionMessage {
  status: HttpStatusCode;
  errors: Record<string, string>[];
}
