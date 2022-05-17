import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject, first } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormState } from '../../shared-interfaces/form-state';
import { FormStateManager } from '../../shared-classes/form-state-manager';
import { SpaceEventEntity } from '../../entities/space-event.entity';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-space-event',
  templateUrl: './create-space-event.component.html',
  styleUrls: ['./create-space-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSpaceEventComponent implements OnInit {
  createSpaceEventForm: FormGroup;
  createSpaceEventFormState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>(FormStateManager.defaultFormState);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService
  ) {
    this.createSpaceEventForm = formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      event_start_date: ['', [Validators.required]],
      event_end_date: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.apiService
      .get('/user-auth/csrf-token')
      .pipe(first())
      .subscribe(() => {});
  }

  createSpaceEvent() {
    FormStateManager.handleLoading(this.createSpaceEventFormState$);

    this.apiService
      .authenticatedPost<SpaceEventEntity>(
        '/space-events',
        this.createSpaceEventForm.getRawValue()
      )
      .pipe(first())
      .subscribe({
        next: (createSpaceEvent) => {
          FormStateManager.handleSuccess(
            this.createSpaceEventFormState$,
            createSpaceEvent.is_approved
              ? 'Your event has been automatically approved as you are a member.'
              : 'As you are not a member, your event will be pending approval.'
          );
          this.createSpaceEventForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          FormStateManager.handleError(this.createSpaceEventFormState$, error);
        },
      });
  }
}
