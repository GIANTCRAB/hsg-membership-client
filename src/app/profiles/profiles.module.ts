import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ViewSelfProfileComponent } from './view-self-profile/view-self-profile.component';
import { NbCardModule, NbUserModule } from '@nebular/theme';

@NgModule({
  declarations: [ViewSelfProfileComponent],
  imports: [CommonModule, ProfilesRoutingModule, NbCardModule, NbUserModule],
})
export class ProfilesModule {}
