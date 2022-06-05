import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInventoryCategoryComponent } from './inventory-categories/view-inventory-category/view-inventory-category.component';
import { ListInventoryCategoriesComponent } from './inventory-categories/list-inventory-categories/list-inventory-categories.component';
import { InventoryManagementRoutingModule } from './inventory-management-routing.module';

@NgModule({
  declarations: [
    ViewInventoryCategoryComponent,
    ListInventoryCategoriesComponent,
  ],
  imports: [CommonModule, InventoryManagementRoutingModule],
})
export class InventoryManagementModule {}
