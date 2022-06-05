import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ListDataDto } from '../../../shared-dto/list-data.dto';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ListDataService } from '../../../services/list-data.service';
import { InventoryCategoryEntity } from '../../../entities/inventory-category.entity';

@Component({
  selector: 'app-list-inventory-categories',
  templateUrl: './list-inventory-categories.component.html',
  styleUrls: ['./list-inventory-categories.component.scss'],
})
export class ListInventoryCategoriesComponent implements OnInit, OnDestroy {
  retrievedInventoryCategories$: BehaviorSubject<
    ListDataDto<InventoryCategoryEntity> | undefined
  > = new BehaviorSubject<ListDataDto<InventoryCategoryEntity> | undefined>(
    undefined
  );
  routeSubscription?: Subscription;

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
    private readonly listDataService: ListDataService
  ) {}

  ngOnInit(): void {
    this.routeSubscription =
      this.listDataService.routeSubscribe<InventoryCategoryEntity>(
        '/inventory-categories',
        this.retrievedInventoryCategories$
      );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
