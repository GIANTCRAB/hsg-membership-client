import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserGuard } from '../guards/authenticated-user.guard';
import { ViewSpaceEventComponent } from '../space-events/view-space-event/view-space-event.component';
import { ViewSelfProfileComponent } from './view-self-profile/view-self-profile.component';

const routes: Routes = [
  {
    path: 'self',
    canActivate: [AuthenticatedUserGuard],
    component: ViewSelfProfileComponent,
  },
  {
    path: ':id',
    component: ViewSpaceEventComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
