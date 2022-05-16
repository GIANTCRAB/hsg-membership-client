import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent implements OnInit {
  flipped$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor() {}

  ngOnInit(): void {}

  toggleFlipCard() {
    const flippedValue = this.flipped$.getValue();
    this.flipped$.next(!flippedValue);
  }
}
