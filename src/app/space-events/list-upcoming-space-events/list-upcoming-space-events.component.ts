import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ListDataDto } from '../../shared-dto/list-data.dto';
import { BehaviorSubject, first, Subscription } from 'rxjs';
import { GetPageDto } from '../../shared-dto/get-page.dto';
import { ActivatedRoute } from '@angular/router';
import { SpaceEventEntity } from '../../entities/space-event.entity';

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
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      let parsedPage = 1;
      if (params['page']) {
        parsedPage = Number(params['page']);
        if (parsedPage < 1) {
          parsedPage = 1;
        }
      }
      const getPageDto: GetPageDto = { page: parsedPage.toString() };

      this.apiService
        .get<ListDataDto<SpaceEventEntity>>(
          '/space-events/upcoming',
          getPageDto
        )
        .pipe(first())
        .subscribe((result) => {
          this.retrievedUpcomingSpaceEvents$.next(result);
        });
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
