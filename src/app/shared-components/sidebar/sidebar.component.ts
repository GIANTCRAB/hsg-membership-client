import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { UserStateService } from '../../services/user-state.service';
import { UserAuthStateService } from '../../services/user-auth-state.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  items: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/',
      icon: 'home-outline',
    },
    {
      title: 'Space Events',
      link: '/space-events',
      icon: 'map-outline',
    },
    {
      title: 'Auth',
      children: [
        {
          title: 'Login',
          link: '/login',
          icon: 'log-in-outline',
        },
        {
          title: 'Register',
          link: '/registration',
          icon: 'edit-2-outline',
        },
      ],
      icon: 'book-open-outline',
    },
  ];

  userItems: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/',
      icon: 'home-outline',
    },
    {
      title: 'Space Events',
      children: [
        {
          title: 'Upcoming',
          link: '/space-events',
          icon: 'map-outline',
        },
        {
          title: 'Create',
          link: '/space-events/create',
          icon: 'plus-outline',
        },
      ],
      icon: 'map-outline',
    },
    {
      title: 'User',
      children: [
        {
          title: 'My Profile',
          link: '/profiles/self',
          icon: 'person-outline',
        },
        {
          title: 'Logout',
          link: '/logout',
          icon: 'log-out-outline',
        },
      ],
      icon: 'person-outline',
    },
  ];

  memberItems: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/',
      icon: 'home-outline',
    },
    {
      title: 'Space Events',
      children: [
        {
          title: 'Upcoming',
          link: '/space-events',
          icon: 'map-outline',
        },
        {
          title: 'Create',
          link: '/space-events/create',
          icon: 'plus-outline',
        },
        {
          title: 'Host Events',
          link: '/space-events/host',
          icon: 'calendar-outline',
        },
      ],
      icon: 'map-outline',
    },
    {
      title: 'Member',
      children: [
        {
          title: 'My Profile',
          link: '/profiles/self',
          icon: 'person-outline',
        },
        {
          title: 'Logout',
          link: '/logout',
          icon: 'log-out-outline',
        },
      ],
      icon: 'person-outline',
    },
  ];

  constructor(
    readonly userStateService: UserStateService,
    private readonly userAuthState: UserAuthStateService
  ) {}

  ngOnInit(): void {
    this.userAuthState.isLoggedIn().pipe(first()).subscribe();
  }
}
