import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ListDataDto } from '../../shared-dto/list-data.dto';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SpaceEventEntity } from '../../entities/space-event.entity';
import { ListDataService } from '../../services/list-data.service';

@Component({
  selector: 'app-list-upcoming-space-events',
  templateUrl: './list-upcoming-space-events.component.html',
  styleUrls: ['./list-upcoming-space-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUpcomingSpaceEventsComponent implements OnInit, OnDestroy {
  retrievedUpcomingSpaceEvents$: BehaviorSubject<
    ListDataDto<SpaceEventEntity> | undefined
  > = new BehaviorSubject<ListDataDto<SpaceEventEntity> | undefined>(undefined);
  routeSubscription?: Subscription;

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
    private readonly listDataService: ListDataService
  ) {}

  ngOnInit(): void {
    this.routeSubscription =
      this.listDataService.routeSubscribe<SpaceEventEntity>(
        '/space-events/upcoming',
        this.retrievedUpcomingSpaceEvents$
      );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
