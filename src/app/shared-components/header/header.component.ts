import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  headerActions: any[] = [
    {
      title: 'Home',
      link: '/',
      icon: 'home-outline',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
