import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public replaceURLParams(url: string, urlReplacements: any) {
    for (const paramName in urlReplacements) {
      if (urlReplacements[paramName] || urlReplacements[paramName] === 0) {
        url = url.replace('{' + paramName + '}', urlReplacements[paramName]);
      }
    }
    return url.replace(/[\/\&\?]{[^}]+}/g, '');
  }
}
