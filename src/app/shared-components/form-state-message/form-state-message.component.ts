import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormState } from '../../shared-interfaces/form-state';

@Component({
  selector: 'app-form-state-message',
  templateUrl: './form-state-message.component.html',
  styleUrls: ['./form-state-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStateMessageComponent implements OnInit {
  @Input()
  formState?: FormState;

  constructor() {}

  ngOnInit(): void {}
}
