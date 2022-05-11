import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, first, Subscription } from 'rxjs';
import { ListDataDto } from '../../shared-dto/list-data.dto';
import { SpaceEventEntity } from '../../entities/space-event.entity';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { GetPageDto } from '../../shared-dto/get-page.dto';

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

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
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
          '/space-events/need-host',
          getPageDto
        )
        .pipe(first())
        .subscribe((result) => {
          this.retrievedNeedHostEvents$.next(result);
        });
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
