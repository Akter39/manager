import { map, Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
export class Distance {
    _distance!: Distances;
    get distance(): Observable<string> {
        return this.translate.get('Distance.Distance.meter').pipe(map(u => u = this._distance + u));
    }
    _style!: Styles;
    get style(): Observable<string> {
        switch(this._style) {
            case Styles.FL: return this.translate.get('Distance.Style.fl');
            case Styles.BK: return this.translate.get('Distance.Style.bk');
            case Styles.BR: return this.translate.get('Distance.Style.br');
            case Styles.FR: return this.translate.get('Distance.Style.fr');
            case Styles.IM: return this.translate.get('Distance.Style.im');
            default: throw new Error('illegal argument');
        }
    }
    _gender!: Genders;
    get gender(): Observable<string> {
        switch(this._gender) {
            case Genders.mail: return this.translate.get('Distance.Gender.mail');
            case Genders.mail: return this.translate.get('Distance.Gender.femail');
            default: throw new Error('illegal argument');
        }
    }
    constructor(distance: Distances, style: Styles, gender: Genders, private translate: TranslateService) {
        this._distance = distance;
        this._style = style;
        this._gender = gender;
    }
}

export enum Styles {
    FL = 'FL',
    BK = 'BK',
    BR = 'BR',
    FR = 'FR',
    IM = 'IM',
    RLFR = 'RLFR',
    RLIM = 'RLIM',
}

export enum Distances {
    _50 = '50',
    _100 = '100',
    _200 = '200',
    _400 = '400',
    _800 = '800',
    _1500 = '1500',
    _4x100 = '4x100',
    _4x200 = '4x200'
}

export enum Genders {
    mail = 'mail',
    femail = 'femail'
}