import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSpaceEventComponent } from './create-space-event/create-space-event.component';
import { AuthenticatedUserGuard } from '../guards/authenticated-user.guard';
import { ListUpcomingSpaceEventsComponent } from './list-upcoming-space-events/list-upcoming-space-events.component';
import { ListNeedHostEventsComponent } from './list-need-host-events/list-need-host-events.component';
import { ViewSpaceEventComponent } from './view-space-event/view-space-event.component';

const routes: Routes = [
  {
    path: 'create',
    canActivate: [AuthenticatedUserGuard],
    component: CreateSpaceEventComponent,
  },
  {
    path: 'host',
    component: ListNeedHostEventsComponent,
  },
  {
    path: ':id',
    component: ViewSpaceEventComponent,
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
