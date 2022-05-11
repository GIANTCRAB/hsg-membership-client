import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';
import { RegistrationRoutingModule } from './registration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegistrationPageComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RegistrationRoutingModule,
    NbLayoutModule,
    NbCardModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
  ],
})
export class RegistrationModule {}
