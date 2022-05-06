import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SpaceEventEntity } from '../../entities/space-event.entity';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-list-events-embed',
  templateUrl: './list-events-embed.component.html',
  styleUrls: ['./list-events-embed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListEventsEmbedComponent implements OnInit, OnDestroy {
  public readonly latestEvents$: BehaviorSubject<SpaceEventEntity[]> =
    new BehaviorSubject<SpaceEventEntity[]>([]);
  private spaceEventsSubscription?: Subscription;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.spaceEventsSubscription = this.apiService
      .get<SpaceEventEntity[]>('/space-events/latest')
      .subscribe((results) => this.latestEvents$.next(results));
  }

  ngOnDestroy(): void {
    if (this.spaceEventsSubscription) {
      this.spaceEventsSubscription.unsubscribe();
    }
  }
}
