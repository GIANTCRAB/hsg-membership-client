import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSpaceEventComponent } from './create-space-event/create-space-event.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateSpaceEventComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaceEventsRoutingModule {}
