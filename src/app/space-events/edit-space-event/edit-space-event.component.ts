import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, first, Subscription } from 'rxjs';
import { FormState } from '../../shared-interfaces/form-state';
import { FormStateManager } from '../../shared-classes/form-state-manager';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { SpaceEventEntity } from '../../entities/space-event.entity';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-edit-space-event',
  templateUrl: './edit-space-event.component.html',
  styleUrls: ['./edit-space-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSpaceEventComponent implements OnInit, OnDestroy {
  private spaceEventId: string = '';
  editSpaceEventForm$: BehaviorSubject<FormGroup | undefined> =
    new BehaviorSubject<FormGroup | undefined>(undefined);
  editSpaceEventFormState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>(FormStateManager.defaultFormState);
  routeSubscription?: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.apiService
          .get<SpaceEventEntity>('/space-events/' + params['id'])
          .pipe(first())
          .subscribe((result) => {
            this.spaceEventId = result.id;
            this.editSpaceEventForm$.next(
              this.formBuilder.group({
                title: [result.title, [Validators.required]],
                description: [result.description, [Validators.required]],
                event_start_date: [
                  moment(result.event_start_date).utc().toDate(),
                  [Validators.required],
                ],
                event_end_date: [
                  moment(result.event_end_date).utc().toDate(),
                  [Validators.required],
                ],
              })
            );
          });
      }
    });

    this.apiService
      .get('/user-auth/csrf-token')
      .pipe(first())
      .subscribe(() => {});
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  editSpaceEvent() {
    const editSpaceEventForm = this.editSpaceEventForm$.getValue();
    if (editSpaceEventForm) {
      FormStateManager.handleLoading(this.editSpaceEventFormState$);

      this.apiService
        .authenticatedPost<SpaceEventEntity>(
          '/space-events/' + this.spaceEventId,
          editSpaceEventForm.getRawValue()
        )
        .pipe(first())
        .subscribe({
          next: () => {
            FormStateManager.handleSuccess(this.editSpaceEventFormState$);
          },
          error: (error: HttpErrorResponse) => {
            FormStateManager.handleError(this.editSpaceEventFormState$, error);
          },
        });
    }
  }
}
