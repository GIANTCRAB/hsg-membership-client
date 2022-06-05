import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { InventoryCategoryEntity } from '../../../entities/inventory-category.entity';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-inventory-category',
  templateUrl: './view-inventory-category.component.html',
  styleUrls: ['./view-inventory-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewInventoryCategoryComponent implements OnInit, OnDestroy {
  public retrievedInventoryCategoryEntity$: BehaviorSubject<
    InventoryCategoryEntity | undefined
  > = new BehaviorSubject<InventoryCategoryEntity | undefined>(undefined);
  routeSubscription?: Subscription;

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.apiService
          .get<InventoryCategoryEntity>('/inventory-categories/' + params['id'])
          .subscribe((result) => {
            this.retrievedInventoryCategoryEntity$.next(result);
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
