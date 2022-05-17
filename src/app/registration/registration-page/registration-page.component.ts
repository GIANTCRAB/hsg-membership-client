import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent implements OnInit {
  flipped$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .get('/user-auth/csrf-token')
      .pipe(first())
      .subscribe(() => {});
  }

  toggleFlipCard() {
    const flippedValue = this.flipped$.getValue();
    this.flipped$.next(!flippedValue);
  }
}
