import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbIconModule,
  NbLayoutModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';
import { FormStateMessageComponent } from './form-state-message/form-state-message.component';

@NgModule({
  declarations: [HeaderComponent, FormStateMessageComponent],
  exports: [HeaderComponent, FormStateMessageComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbActionsModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    RouterModule,
    NbAlertModule,
  ],
})
export class SharedComponentsModule {}
