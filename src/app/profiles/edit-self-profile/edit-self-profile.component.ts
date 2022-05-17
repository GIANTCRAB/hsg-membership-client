import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-edit-self-profile',
  templateUrl: './edit-self-profile.component.html',
  styleUrls: ['./edit-self-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSelfProfileComponent implements OnInit {
  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .get('/user-auth/csrf-token')
      .pipe(first())
      .subscribe(() => {});
  }
}
