import { CompetitionsService } from '../services/competitions.service';
import { map, Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
export class Distance {
    _distance!: Distances;
    get distance(): Observable<string> {
        return this.competitions.getDistanceFullName(this._distance);
    }
    _style!: Styles;
    get style(): Observable<string> {
        return this.competitions.getStyleFullName(this._style);
    }
    _gender!: Genders;
    get gender(): Observable<string> {
        return this.competitions.getSexFullName(this._gender);
    }
    constructor(distance: Distances, style: Styles, gender: Genders, private competitions: CompetitionsService) {
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