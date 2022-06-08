import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { BehaviorSubject, first } from 'rxjs';
import { FormState } from '../../../shared-interfaces/form-state';
import { FormStateManager } from '../../../shared-classes/form-state-manager';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-inventory-category',
  templateUrl: './create-inventory-category.component.html',
  styleUrls: ['./create-inventory-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInventoryCategoryComponent implements OnInit {
  createInventoryCategoryForm: FormGroup;
  createInventoryCategoryFormState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>(FormStateManager.defaultFormState);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService
  ) {
    this.createInventoryCategoryForm = formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  createInventoryCategory() {
    FormStateManager.handleLoading(this.createInventoryCategoryFormState$);
    this.apiService
      .authenticatedPost(
        '/inventory-categories',
        this.createInventoryCategoryForm.getRawValue()
      )
      .pipe(first())
      .subscribe({
        next: () => {
          FormStateManager.handleSuccess(
            this.createInventoryCategoryFormState$
          );
          this.createInventoryCategoryForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          FormStateManager.handleError(
            this.createInventoryCategoryFormState$,
            error
          );
        },
      });
  }
}
