/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MissingTranslationService {

  constructor() { }
}*/
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class MissingTranslationService {

  handle(params: MissingTranslationHandlerParams) {
    return `WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`;
  }

}
