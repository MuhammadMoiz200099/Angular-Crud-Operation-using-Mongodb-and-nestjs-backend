import { ContentType } from '@app-types/api-config/content-type';
import { HttpMethods } from '@app-types/api-config/http-methods';

interface ResStatusCodes {
  already_used?: number;
  not_found?: 404;
  un_authorized?: 401;
  error?: 400;
  mandatory_required?: 400;
}
export interface APIDeclaration {
  url?: string;
  method: HttpMethods;
  content_type?: ContentType
  res_type: string | 'void';
  req_type?: string;
  url_replacement_type?: string;
  query_type?: string;
  codes?: ResStatusCodes;
}
export interface APIDeclarations {
  [apiName: string]: APIDeclaration;
}
