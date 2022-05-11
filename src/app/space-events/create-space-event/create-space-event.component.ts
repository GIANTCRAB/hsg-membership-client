import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-space-event',
  templateUrl: './create-space-event.component.html',
  styleUrls: ['./create-space-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSpaceEventComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
