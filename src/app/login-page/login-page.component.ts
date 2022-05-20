import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, first, Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit, OnDestroy {
  flipped$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  resetPasswordId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  routeSubscription?: Subscription;

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.apiService
      .get('/user-auth/csrf-token')
      .pipe(first())
      .subscribe(() => {});

    this.routeSubscription = this.route.params.subscribe((params) => {
      if (params['id'] && params['id'] !== '') {
        this.toggleFlipCard();
        this.resetPasswordId$.next(params['id']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  toggleFlipCard() {
    const flippedValue = this.flipped$.getValue();
    this.flipped$.next(!flippedValue);
  }
}
