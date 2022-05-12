import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, first, Subscription } from 'rxjs';
import { SpaceEventEntity } from '../../entities/space-event.entity';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-space-event',
  templateUrl: './view-space-event.component.html',
  styleUrls: ['./view-space-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSpaceEventComponent implements OnInit, OnDestroy {
  retrievedSpaceEvent$: BehaviorSubject<SpaceEventEntity | undefined> =
    new BehaviorSubject<SpaceEventEntity | undefined>(undefined);
  routeSubscription?: Subscription;

  constructor(
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
            this.retrievedSpaceEvent$.next(result);
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
