import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceEventsRoutingModule } from './space-events-routing.module';
import { CreateSpaceEventComponent } from './create-space-event/create-space-event.component';
import { ListUpcomingSpaceEventsComponent } from './list-upcoming-space-events/list-upcoming-space-events.component';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbTimepickerModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ListNeedHostEventsComponent } from './list-need-host-events/list-need-host-events.component';
import { ViewSpaceEventComponent } from './view-space-event/view-space-event.component';
import { EditSpaceEventComponent } from './edit-space-event/edit-space-event.component';
import { NbMomentDateModule } from '@nebular/moment';

@NgModule({
  declarations: [
    CreateSpaceEventComponent,
    ListUpcomingSpaceEventsComponent,
    ListNeedHostEventsComponent,
    ViewSpaceEventComponent,
    EditSpaceEventComponent,
  ],
  imports: [
    CommonModule,
    SpaceEventsRoutingModule,
    NbMomentDateModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbLayoutModule,
    ReactiveFormsModule,
    NbCardModule,
    SharedComponentsModule,
    NbInputModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbIconModule,
  ],
})
export class SpaceEventsModule {}
