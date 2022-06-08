import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInventoryCategoryComponent } from './inventory-categories/view-inventory-category/view-inventory-category.component';
import { ListInventoryCategoriesComponent } from './inventory-categories/list-inventory-categories/list-inventory-categories.component';
import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
import { CreateInventoryCategoryComponent } from './inventory-categories/create-inventory-category/create-inventory-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';

@NgModule({
  declarations: [
    ViewInventoryCategoryComponent,
    ListInventoryCategoriesComponent,
    CreateInventoryCategoryComponent,
  ],
  imports: [
    CommonModule,
    InventoryManagementRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
  ],
})
export class InventoryManagementModule {}
