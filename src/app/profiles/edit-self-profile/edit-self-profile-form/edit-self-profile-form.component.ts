import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, first } from 'rxjs';
import { FormState } from '../../../shared-interfaces/form-state';
import { FormStateManager } from '../../../shared-classes/form-state-manager';
import { ApiService } from '../../../services/api.service';
import { UserEntity } from '../../../entities/user.entity';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-self-profile-form',
  templateUrl: './edit-self-profile-form.component.html',
  styleUrls: ['./edit-self-profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSelfProfileFormComponent implements OnInit {
  public readonly editSelfForm: FormGroup;
  public readonly editSelfFormState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>(FormStateManager.defaultFormState);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService
  ) {
    this.editSelfForm = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      is_public: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.apiService
      .authenticatedGet<UserEntity>('/user-profiles/self')
      .subscribe((result) => {
        this.editSelfForm.patchValue({
          first_name: result.first_name,
          last_name: result.last_name,
          is_public: Boolean(result.is_public),
        });
      });
  }

  editProfile() {
    FormStateManager.handleLoading(this.editSelfFormState$);

    this.apiService
      .authenticatedPost<UserEntity>(
        '/user-profiles/update-details',
        this.editSelfForm.getRawValue()
      )
      .pipe(first())
      .subscribe({
        next: (result) => {
          FormStateManager.handleSuccess(this.editSelfFormState$);
        },
        error: (error: HttpErrorResponse) => {
          FormStateManager.handleError(this.editSelfFormState$, error);
        },
      });
  }
}
