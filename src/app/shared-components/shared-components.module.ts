import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';
import { FormStateMessageComponent } from './form-state-message/form-state-message.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, FormStateMessageComponent, SidebarComponent],
  exports: [HeaderComponent, FormStateMessageComponent, SidebarComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    RouterModule,
    NbAlertModule,
  ],
})
export class SharedComponentsModule {}
