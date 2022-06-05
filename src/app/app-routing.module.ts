import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { AuthenticatedUserGuard } from './guards/authenticated-user.guard';

const routes: Routes = [
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'space-events',
    loadChildren: () =>
      import('./space-events/space-events.module').then(
        (m) => m.SpaceEventsModule
      ),
  },
  {
    path: 'profiles',
    loadChildren: () =>
      import('./profiles/profiles.module').then((m) => m.ProfilesModule),
  },
  {
    path: 'inventory-management',
    loadChildren: () =>
      import('./inventory-management/inventory-management.module').then(
        (m) => m.InventoryManagementModule
      ),
  },
  {
    path: 'login/:id',
    component: LoginPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'logout',
    canActivate: [AuthenticatedUserGuard],
    component: LogoutPageComponent,
  },
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
