import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceEventsRoutingModule } from './space-events-routing.module';
import { CreateSpaceEventComponent } from './create-space-event/create-space-event.component';

@NgModule({
  declarations: [
    CreateSpaceEventComponent
  ],
  imports: [CommonModule, SpaceEventsRoutingModule],
})
export class SpaceEventsModule {}
