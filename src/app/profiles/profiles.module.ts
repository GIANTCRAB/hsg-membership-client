import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ViewSelfProfileComponent } from './view-self-profile/view-self-profile.component';
import {
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
} from '@nebular/theme';
import { EditSelfProfileComponent } from './edit-self-profile/edit-self-profile.component';
import { EditSelfProfileFormComponent } from './edit-self-profile/edit-self-profile-form/edit-self-profile-form.component';
import { EditSelfPasswordFormComponent } from './edit-self-profile/edit-self-password-form/edit-self-password-form.component';

@NgModule({
  declarations: [
    ViewSelfProfileComponent,
    EditSelfProfileComponent,
    EditSelfProfileFormComponent,
    EditSelfPasswordFormComponent,
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    NbCardModule,
    NbUserModule,
    NbTabsetModule,
    NbButtonModule,
  ],
})
export class ProfilesModule {}
