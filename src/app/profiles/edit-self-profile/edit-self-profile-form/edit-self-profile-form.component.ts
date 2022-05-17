import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-self-profile-form',
  templateUrl: './edit-self-profile-form.component.html',
  styleUrls: ['./edit-self-profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSelfProfileFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
