import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(private readonly sidebarService: NbSidebarService) {}

  ngOnInit(): void {}

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }
}
