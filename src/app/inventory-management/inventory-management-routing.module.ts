import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewInventoryCategoryComponent } from './inventory-categories/view-inventory-category/view-inventory-category.component';
import { ListInventoryCategoriesComponent } from './inventory-categories/list-inventory-categories/list-inventory-categories.component';
import { CreateInventoryCategoryComponent } from './inventory-categories/create-inventory-category/create-inventory-category.component';

const routes: Routes = [
  {
    path: 'inventory-categories/create',
    component: CreateInventoryCategoryComponent,
  },
  {
    path: 'inventory-categories/:id',
    component: ViewInventoryCategoryComponent,
  },
  {
    path: 'inventory-categories',
    component: ListInventoryCategoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryManagementRoutingModule {}
