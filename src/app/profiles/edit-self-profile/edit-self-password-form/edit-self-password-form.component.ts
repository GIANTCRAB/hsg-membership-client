import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-self-password-form',
  templateUrl: './edit-self-password-form.component.html',
  styleUrls: ['./edit-self-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSelfPasswordFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
