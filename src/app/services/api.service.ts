import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SERVER_APIS } from '@app-constants/api-config/api-declaration.constants';
import { CarDeleteURLReplacementParams } from '@app-types/api-config/api-url-replacements';
import { UrlQueryParams } from '@app-types/api-config/query-parameters';
import { CarDataResponsePayload, CarDeleteResponsePayload } from '@app-types/api-config/response-payloads';
import { Observable } from 'rxjs';
import { ServerDataService } from './server-data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private servcerService: ServerDataService) { }
  
  public getAllCars(pageEvent?: PageEvent, search?: string): Observable<CarDataResponsePayload> {
    const apiConfig = SERVER_APIS.get_all_cars;
    
    const query_params: UrlQueryParams = { }
    
    if(pageEvent) {
      query_params.limit = pageEvent.pageSize;
      query_params.offset = pageEvent.pageSize * pageEvent.pageIndex;
    }

    if(search) {
      query_params.search = search;
    }

    return this.servcerService.apiCall<CarDataResponsePayload, void, void>(
      apiConfig, undefined, undefined, true, query_params
    );
  }

  public deleteCarByID(id: number): Observable<CarDeleteResponsePayload> {
    const apiConfig = SERVER_APIS.delete_car_by_id;

    const urlParams: CarDeleteURLReplacementParams = {
      car_id: id
    }

    return this.servcerService.apiCall<CarDeleteResponsePayload, void, CarDeleteURLReplacementParams>(apiConfig, undefined, urlParams, true)

  }

}
