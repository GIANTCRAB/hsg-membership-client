import { Injectable } from '@angular/core';
import { GetPageDto } from '../shared-dto/get-page.dto';
import { ListDataDto } from '../shared-dto/list-data.dto';
import { BehaviorSubject, first, Subscription } from 'rxjs';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ListDataService {
  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute
  ) {}

  routeSubscribe<T>(
    path: string,
    retrievedItems$: BehaviorSubject<ListDataDto<T> | undefined>
  ): Subscription {
    return this.route.params.subscribe((params) => {
      let parsedPage = 1;
      if (params['page']) {
        parsedPage = Number(params['page']);
        if (parsedPage < 1) {
          parsedPage = 1;
        }
      }
      const getPageDto: GetPageDto = { page: parsedPage.toString() };

      this.apiService
        .get<ListDataDto<T>>(path, getPageDto)
        .pipe(first())
        .subscribe((result) => {
          retrievedItems$.next(result);
        });
    });
  }
}
