import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserEntity } from '../../entities/user.entity';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view-self-profile',
  templateUrl: './view-self-profile.component.html',
  styleUrls: ['./view-self-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSelfProfileComponent implements OnInit {
  public retrievedUserEntity$: BehaviorSubject<UserEntity | undefined> =
    new BehaviorSubject<UserEntity | undefined>(undefined);

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .authenticatedGet<UserEntity>('/user-profiles/self')
      .subscribe((result) => {
        this.retrievedUserEntity$.next(result);
      });
  }
}
