import { map, Observable, take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Styles, Genders, Distances } from 'src/app/models/distance';
import { Style } from 'src/app/models/style';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private translate: TranslateService) { }

  getStyleFullName(style: Styles): Observable<string> {
    switch(style) {
      case Styles.FL: return this.translate.get('Distance.Style.fl');
      case Styles.BK: return this.translate.get('Distance.Style.bk');
      case Styles.BR: return this.translate.get('Distance.Style.br');
      case Styles.FR: return this.translate.get('Distance.Style.fr');
      case Styles.IM: return this.translate.get('Distance.Style.im');
      case Styles.RLFR: return this.translate.get('Distance.Style.rlfr');
      case Styles.RLIM: return this.translate.get('Distance.Style.rlim');
      default: throw new Error('illegal argument');
    }
  }

  getStyleEnum(style: Observable<string>): Styles {
    let _style: string = this.getTranslateString(style);
    switch(_style) {
      case this.getTranslateString(this.translate.get('Distance.Style.fl')): return Styles.FL;
      case this.getTranslateString(this.translate.get('Distance.Style.bk')): return Styles.BK;
      case this.getTranslateString(this.translate.get('Distance.Style.br')): return Styles.BR;
      case this.getTranslateString(this.translate.get('Distance.Style.fr')): return Styles.FR;
      case this.getTranslateString(this.translate.get('Distance.Style.im')): return Styles.IM;
      case this.getTranslateString(this.translate.get('Distance.Style.rlfr')): return Styles.RLFR;
      case this.getTranslateString(this.translate.get('Distance.Style.rlim')): return Styles.RLIM;
      default: throw new Error('illegal argument')
    }
  }

  getGenderFullName(gender: Genders): Observable<string> {
    switch(gender) {
      case Genders.mail: return this.translate.get('Distance.Gender.mail');
      case Genders.femail: return this.translate.get('Distance.Gender.femail');
      default: throw new Error('illegal argument');
    }
  }

  getSexFullName(gender: Genders): Observable<string> {
    switch(gender) {
      case Genders.mail: return this.translate.get('Competition.men');
      case Genders.femail: return this.translate.get('Competition.women');
      default: throw new Error('illegal argument');
    }
  }

  getGenderEnum(gender: Observable<string>): Genders {
    let _gender: string = this.getTranslateString(gender);
    switch(_gender) {
      case this.getTranslateString(this.translate.get('Distance.Gender.mail')): return Genders.mail;
      case this.getTranslateString(this.translate.get('Distance.Gender.femail')): return Genders.femail;
      default: throw new Error('illegal argument');
    }
  }

  getDistanceFullName(distance: Distances): Observable<string> {
    return this.translate.get('Distance.Distance.meter').pipe(map(u => u = distance + u));
  }

  getDistanceEnum(distance: Observable<string>): Distances {
    let _distance: string = this.getTranslateString(distance);
    _distance = _distance.slice(0, -1);
    switch(_distance) {
      case '50': return Distances._50;
      case '100': return Distances._100;
      case '200': return Distances._200;
      case '400': return Distances._400;
      case '800': return Distances._800;
      case '1500': return Distances._1500;
      case '4x100': return Distances._4x100;
      case '4x200': return Distances._4x200;
      default: throw new Error('illegal argument');
    }
  }

  getTranslateString(obs: Observable<string>): string {
    let str!: string;
    obs.pipe(take(1)).subscribe(u => str = u);
    return str;
  }
}
