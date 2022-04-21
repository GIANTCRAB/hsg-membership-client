import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, OperatorFunction, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserStateService } from './user-state.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly userStateService: UserStateService,
    private readonly router: Router
  ) {}

  public getEndpointHostUrl(): string {
    return environment.endpoint;
  }

  public get<T>(
    path: string,
    data: { [param: string]: string } = {}
  ): Observable<T> {
    let params = new HttpParams();
    for (const dataKey in data) {
      if (dataKey && data[dataKey]) {
        params = params.set(dataKey, data[dataKey]);
      }
    }
    const options = {
      headers: this.getJsonHeaders(),
      params,
    };
    return this.httpClient.get<T>(this.getEndpointHostUrl() + path, options);
  }

  public post<T>(
    path: string,
    data: { [param: string]: string | string[] } = {}
  ): Observable<T> {
    const options = {
      headers: this.getJsonHeaders(),
    };
    return this.httpClient.post<T>(
      this.getEndpointHostUrl() + path,
      data,
      options
    );
  }

  /**
   * Used by a user that is logged in
   *
   * @param path
   * @param data
   * @param paramsIsArray
   */
  public authenticatedGet<T>(
    path: string,
    data: { [param: string]: string } = {},
    paramsIsArray: boolean = false
  ): Observable<T> {
    let params = new HttpParams();
    if (paramsIsArray) {
      params = this.arrayParamsSet(params, data);
    } else {
      for (const dataKey in data) {
        if (dataKey && data[dataKey]) {
          params = params.set(dataKey, data[dataKey]);
        }
      }
    }
    const options = {
      headers: this.getAuthenticatedJsonHeaders(),
      params,
      withCredentials: true,
    };
    return this.httpClient
      .get<T>(this.getEndpointHostUrl() + path, options)
      .pipe(this.tapCatchUnauthorized());
  }

  private tapCatchUnauthorized(): OperatorFunction<any, any> {
    return tap({
      next: () => {},
      error: (err: HttpErrorResponse) => {
        // Force logout if unauthorized OR forbidden
        if (err.status === 401 || err.status === 403) {
          this.userStateService.clearToken();
          this.router.navigateByUrl('/', { replaceUrl: true });
        }
      },
    });
  }

  /**
   * Handles one layer of array
   *
   * @param params
   * @param data
   * @param arrayKey
   * @private
   */
  private arrayParamsSet(
    params: HttpParams,
    data: string[] | { [param: string]: string | string[] },
    arrayKey: string = ''
  ): HttpParams {
    if (Array.isArray(data)) {
      for (const dataValue of data) {
        params = params.append(arrayKey, dataValue);
      }
      return params;
    } else {
      for (const dataKey in data) {
        if (dataKey && data[dataKey]) {
          const dataValue: string | string[] = data[dataKey];
          if (Array.isArray(dataValue)) {
            params = this.arrayParamsSet(params, dataValue, dataKey);
          } else {
            params = params.append(dataKey, dataValue);
          }
        }
      }

      return params;
    }
  }

  public authenticatedPost<T>(
    path: string,
    data: { [param: string]: string | string[] } = {}
  ): Observable<T> {
    const options = {
      headers: this.getAuthenticatedJsonHeaders(),
      withCredentials: true,
    };
    return this.httpClient.post<T>(
      this.getEndpointHostUrl() + path,
      data,
      options
    );
  }

  public authenticatedPatch<T>(
    path: string,
    data: { [param: string]: string | string[] } = {}
  ): Observable<T> {
    const options = {
      headers: this.getAuthenticatedJsonHeaders(),
      withCredentials: true,
    };
    return this.httpClient.patch<T>(
      this.getEndpointHostUrl() + path,
      data,
      options
    );
  }

  public authenticatedDelete<T>(path: string): Observable<T> {
    const options = {
      headers: this.getAuthenticatedJsonHeaders(),
      withCredentials: true,
    };
    return this.httpClient.delete<T>(this.getEndpointHostUrl() + path, options);
  }

  /**
   * Important side effect: upload-file is changed into the file attribute data
   *
   * @param path
   * @param data
   * @param singleFile
   */
  public authenticatedFilePost<T>(
    path: string,
    data: { [param: string]: string },
    singleFile: File
  ): Observable<T> {
    const options = {
      headers: this.getAuthenticatedFileHeaders(),
      withCredentials: true,
    };
    const formData: FormData = new FormData();
    for (let paramDataKey in data) {
      formData.append(paramDataKey, data[paramDataKey]);
    }
    formData.append('upload-file', singleFile, singleFile.name);

    return this.httpClient.post<T>(
      this.getEndpointHostUrl() + path,
      formData,
      options
    );
  }

  private getJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    });
  }

  private getAuthenticatedJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.userStateService.getToken(),
    });
  }

  private getAuthenticatedFileHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.userStateService.getToken(),
    });
  }
}
