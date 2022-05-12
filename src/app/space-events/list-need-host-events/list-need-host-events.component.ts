import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ListDataDto } from '../../shared-dto/list-data.dto';
import { SpaceEventEntity } from '../../entities/space-event.entity';
import { ListDataService } from '../../services/list-data.service';

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

  constructor(private readonly listDataService: ListDataService) {}

  ngOnInit(): void {
    this.routeSubscription =
      this.listDataService.routeSubscribe<SpaceEventEntity>(
        '/space-events/need-host',
        this.retrievedNeedHostEvents$
      );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
