import { FormGroup } from '@angular/forms';
import { ApiUrl } from '../constants/api-url.constants';
import { Competition } from '../models/competition';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/auth/user';
import { UserInfo } from '../models/auth/user-info';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ConditionNewCompetition } from 'src/app/models/condition-new-competition';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) { }


  public Competition = new class {

    constructor(private superThis: ReceivingService) {
    }

    newCompetition(control: FormGroup): Observable<ConditionNewCompetition> {
      return this.superThis.http
        .post<ConditionNewCompetition>(this.superThis.baseUrl + ApiUrl.Competition.newCompetitions, control.value);
    }

  }(this);

  public Language = new class {
    constructor(private superThis: ReceivingService) {}

    setLanguage(): Observable<any> {
      return this.superThis.http.post(this.superThis.baseUrl + ApiUrl.Language.set, {});
    }
  }(this)

  getUserInfo(id: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.baseUrl);
  }

  
}