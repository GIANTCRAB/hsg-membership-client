import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbTimepickerModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { MainPageComponent } from './main-page/main-page.component';
import { ListEventsEmbedComponent } from './main-page/list-events-embed/list-events-embed.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutPageComponent } from './logout-page/logout-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ListEventsEmbedComponent,
    LoginPageComponent,
    LogoutPageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbActionsModule,
    NbSidebarModule,
    NbEvaIconsModule,
    NbIconModule,
    NbInputModule,
    SharedComponentsModule,
    NbCardModule,
    NbButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
