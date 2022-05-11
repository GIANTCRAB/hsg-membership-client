import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSpaceEventComponent } from './create-space-event/create-space-event.component';
import { AuthenticatedUserGuard } from '../guards/authenticated-user.guard';
import { ListUpcomingSpaceEventsComponent } from './list-upcoming-space-events/list-upcoming-space-events.component';

const routes: Routes = [
  {
    path: 'create',
    canActivate: [AuthenticatedUserGuard],
    component: CreateSpaceEventComponent,
  },
  {
    path: '',
    component: ListUpcomingSpaceEventsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaceEventsRoutingModule {}