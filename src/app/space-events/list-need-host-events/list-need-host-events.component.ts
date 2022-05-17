import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, first, Subscription } from 'rxjs';
import { ListDataDto } from '../../shared-dto/list-data.dto';
import { SpaceEventEntity } from '../../entities/space-event.entity';
import { ListDataService } from '../../services/list-data.service';
import { ApiService } from '../../services/api.service';
import { FormState } from '../../shared-interfaces/form-state';
import { FormStateManager } from '../../shared-classes/form-state-manager';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-need-host-events',
  templateUrl: './list-need-host-events.component.html',
  styleUrls: ['./list-need-host-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListNeedHostEventsComponent implements OnInit, OnDestroy {
  retrievedNeedHostEvents$: BehaviorSubject<
    ListDataDto<SpaceEventEntity> | undefined
  > = new BehaviorSubject<ListDataDto<SpaceEventEntity> | undefined>(undefined);
  routeSubscription?: Subscription;
  needHostSpaceEventFormState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>(FormStateManager.defaultFormState);

  constructor(
    private readonly listDataService: ListDataService,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.routeSubscription =
      this.listDataService.routeSubscribe<SpaceEventEntity>(
        '/space-events/need-host',
        this.retrievedNeedHostEvents$
      );
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

  public hostSpaceEvent(id: string) {
    FormStateManager.handleLoading(this.needHostSpaceEventFormState$);

    this.apiService
      .authenticatedPost('/space-events/' + id + '/host-as-member')
      .pipe(first())
      .subscribe({
        next: () => {
          FormStateManager.handleSuccess(this.needHostSpaceEventFormState$);
          this.listDataService.refreshList<SpaceEventEntity>(
            '/space-events/need-host',
            this.retrievedNeedHostEvents$
          );
        },
        error: (error: HttpErrorResponse) => {
          FormStateManager.handleError(
            this.needHostSpaceEventFormState$,
            error
          );
        },
      });
  }
}
