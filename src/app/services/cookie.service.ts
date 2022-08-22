import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  private static getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');

    return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
  }

  private static safeDecodeURIComponent(encodedURIComponent: string): string {
    try {
      return decodeURIComponent(encodedURIComponent);
    } catch {
      return encodedURIComponent;
    }
  }

  public get(name: string): string {
      name = encodeURIComponent(name);

      const regExp: RegExp = CookieService.getCookieRegExp(name);
      const result: RegExpExecArray | null = regExp.exec(this.document.cookie);
      if (result) {
        return result[1] ? CookieService.safeDecodeURIComponent(result[1]) : '';
      }
      return '';
  }
}
