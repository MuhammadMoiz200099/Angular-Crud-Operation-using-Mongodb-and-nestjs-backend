import { APP_CONSTANTS } from "@app-constants/app.constants";
import { APIDeclaration } from "@app-types/api-config/api-declaration";

const BASE_URL = APP_CONSTANTS.BASE_URL;

export const SERVER_APIS = {
    get_all_cars: (<APIDeclaration>{
        url: `${BASE_URL}/car`,
        method: 'get',
        res_type: 'CarDataResponsePayload'
    }),
    get_car_by_id: (<APIDeclaration>{
        url: `${BASE_URL}/car/{car_id}`,
        method: 'get',
        res_type: 'ICar',
        url_replacement_type: 'CarURLReplacementParams'
    }),
    insert_new_car: (<APIDeclaration>{
        url: `${BASE_URL}/car`,
        method: 'post',
        res_type: 'ICar',
    }),
    update_car_by_id: (<APIDeclaration>{
        url: `${BASE_URL}/car/{car_id}`,
        method: 'put',
        res_type: 'ICar',
        url_replacement_type: 'CarURLReplacementParams'
    }),
    delete_car_by_id: (<APIDeclaration>{
        url: `${BASE_URL}/car/{car_id}`,
        method: 'delete',
        url_replacement_type: 'CarURLReplacementParams'
    })
}