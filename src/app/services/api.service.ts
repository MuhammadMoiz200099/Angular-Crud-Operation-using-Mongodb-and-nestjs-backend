import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SERVER_APIS } from '@app-constants/api-config/api-declaration.constants';
import { CarURLReplacementParams } from '@app-types/api-config/api-url-replacements';
import { UrlQueryParams } from '@app-types/api-config/query-parameters';
import { CarDataResponsePayload, CarDeleteResponsePayload, CarOperationResponsePayload } from '@app-types/api-config/response-payloads';
import { ICar } from '@app-types/car';
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

  public getCarByID(id: string): Observable<CarOperationResponsePayload> {
    const apiConfig = SERVER_APIS.get_car_by_id;
    
    const urlParams: CarURLReplacementParams = {
      car_id: id
    }

    return this.servcerService.apiCall<CarOperationResponsePayload, void, CarURLReplacementParams>(
      apiConfig, undefined, urlParams, true, 
    );
  }

  public insertCar(requestPayload: ICar): Observable<CarOperationResponsePayload> {
    const apiConfig = SERVER_APIS.insert_new_car;
    

    return this.servcerService.apiCall<CarOperationResponsePayload, ICar, void>(
      apiConfig, requestPayload, undefined, true, 
    );
  }

  public updateCarById(id: string, requestPayload: ICar): Observable<CarOperationResponsePayload> {
    const apiConfig = SERVER_APIS.update_car_by_id;
    
    const urlParams: CarURLReplacementParams = {
      car_id: id
    }

    return this.servcerService.apiCall<CarOperationResponsePayload, ICar, CarURLReplacementParams>(
      apiConfig, requestPayload, urlParams, true, 
    );
  }

  public deleteCarByID(id: string): Observable<CarDeleteResponsePayload> {
    const apiConfig = SERVER_APIS.delete_car_by_id;

    const urlParams: CarURLReplacementParams = {
      car_id: id
    }

    return this.servcerService.apiCall<CarDeleteResponsePayload, void, CarURLReplacementParams>(
      apiConfig, undefined, urlParams, true
    );
  }

}
