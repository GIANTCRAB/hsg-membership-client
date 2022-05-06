import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NbActionsModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbSidebarModule,
  NbThemeModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { MainPageComponent } from './main-page/main-page.component';
import { ListEventsEmbedComponent } from './main-page/list-events-embed/list-events-embed.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, ListEventsEmbedComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbActionsModule,
    NbSidebarModule,
    NbEvaIconsModule,
    NbIconModule,
    SharedComponentsModule,
    NbCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
