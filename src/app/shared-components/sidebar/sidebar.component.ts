import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

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

  constructor() {}

  ngOnInit(): void {}
}
