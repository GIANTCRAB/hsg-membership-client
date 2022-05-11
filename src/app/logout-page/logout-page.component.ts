import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { FormState } from '../shared-interfaces/form-state';
import { FormStateManager } from '../shared-classes/form-state-manager';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStateService } from '../services/user-state.service';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutPageComponent implements OnInit {
  logoutFormState$: BehaviorSubject<FormState> = new BehaviorSubject<FormState>(
    FormStateManager.defaultFormState
  );

  constructor(
    private readonly apiService: ApiService,
    private readonly userStateService: UserStateService
  ) {}

  ngOnInit(): void {}

  doLogout() {
    FormStateManager.handleLoading(this.logoutFormState$);

    this.apiService.authenticatedDelete('/user-auth/logout').subscribe({
      next: () => {
        FormStateManager.handleSuccess(
          this.logoutFormState$,
          'Logout successful!'
        );
        this.userStateService.clearToken();
      },
      error: (error: HttpErrorResponse) => {
        FormStateManager.handleError(this.logoutFormState$, error);
      },
    });
  }
}
