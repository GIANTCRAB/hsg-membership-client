import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceEventsRoutingModule } from './space-events-routing.module';
import { CreateSpaceEventComponent } from './create-space-event/create-space-event.component';
import { ListUpcomingSpaceEventsComponent } from './list-upcoming-space-events/list-upcoming-space-events.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbLayoutModule,
  NbTimepickerModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [CreateSpaceEventComponent, ListUpcomingSpaceEventsComponent],
  imports: [
    CommonModule,
    SpaceEventsRoutingModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbLayoutModule,
    ReactiveFormsModule,
    NbCardModule,
    SharedComponentsModule,
    NbInputModule,
    NbButtonModule,
  ],
})
export class SpaceEventsModule {}
