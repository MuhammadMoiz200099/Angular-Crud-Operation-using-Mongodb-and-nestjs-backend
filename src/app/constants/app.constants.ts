import { AppConstants } from '@app-types/app-constants';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.api_base_url;

export const APP_CONSTANTS: AppConstants = {
  BASE_URL: BASE_URL,

  pageSize: 10
};
