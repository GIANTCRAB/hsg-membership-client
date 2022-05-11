import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceEventsRoutingModule } from './space-events-routing.module';
import { CreateSpaceEventComponent } from './create-space-event/create-space-event.component';
import { ListUpcomingSpaceEventsComponent } from './list-upcoming-space-events/list-upcoming-space-events.component';

@NgModule({
  declarations: [
    CreateSpaceEventComponent,
    ListUpcomingSpaceEventsComponent
  ],
  imports: [CommonModule, SpaceEventsRoutingModule],
})
export class SpaceEventsModule {}
