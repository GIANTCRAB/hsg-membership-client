import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbIconModule,
  NbLayoutModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbActionsModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    RouterModule,
  ],
})
export class SharedComponentsModule {}
