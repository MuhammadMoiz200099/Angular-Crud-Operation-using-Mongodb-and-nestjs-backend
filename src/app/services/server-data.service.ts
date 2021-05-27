import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIDeclaration } from '@app-types/api-config/api-declaration';
import { UrlQueryParams } from '@app-types/api-config/query-parameters';
import { Observable, throwError } from 'rxjs';
import { last, catchError, map } from 'rxjs/operators';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {
  
  private globalHeaders = new HttpHeaders();

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private helpersService: HelperService
  ) { }

  public apiCall<T, R, U>(
    apiDeclaration: APIDeclaration, reqPayload: R, urlParams: U,
    showToast?: boolean, queryParams?: UrlQueryParams
  ): Observable<T> {
    const url = this.helpersService.replaceURLParams(
      apiDeclaration.url as string,
      urlParams || {}
    );

    const method = apiDeclaration.method;
    let reqAgent;
    if (method === 'post' || method === 'put' || method === 'patch') {
      reqAgent = this.http[method](url, reqPayload, { headers: this.globalHeaders });
    } else if (method === 'get' && queryParams) {
      reqAgent = this.http.get(url, { params: <any>queryParams, headers: this.globalHeaders });
    } else {
      reqAgent = this.http[method](url, { headers: this.globalHeaders });
    }
    return this.responseLayer(reqAgent, showToast);
  }


  private showToast(message: string) {
    this.snackBar.open(message, 'Please check internet connection', { duration: 3000 });
  }

  private responseLayer<T>(reqAgent: Observable<any>, showToast?: boolean): Observable<T> {
    return reqAgent
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (showToast) {
            this.showToast(error.error && error.error['error'] || 'Request failed to complete');
          }
          return throwError(error);
        }),
        last()
      );
  }
}
