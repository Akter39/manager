import { YearGroup } from 'src/app/models/year-group';
import { Style } from 'src/app/models/style';
import { CompetitionsService } from 'src/app/services/competitions.service';
import { Distance, Distances } from 'src/app/models/distance';
import { FormGroup } from '@angular/forms';
import { ApiUrl } from '../constants/api-url.constants';
import { Competition } from '../models/competition';
import { map, Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/models/auth/user';
import { UserInfo } from '../models/auth/user-info';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Directive } from '@angular/core';
import { ConditionNewCompetition } from 'src/app/models/condition-new-competition';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {

  constructor(
    private http: HttpClient,
    private competitionsService: CompetitionsService,
    @Inject('BASE_URL') private baseUrl: string,
  ) { }


  public Competition = new class {

    constructor(private superThis: ReceivingService) {
    }

    newCompetition(control: FormGroup): Observable<ConditionNewCompetition> {
      return this.superThis.http
        .post<ConditionNewCompetition>(this.superThis.baseUrl + ApiUrl.Competition.newCompetitions, control.value);
    }

    upcomingCompetition(): Observable<Competition[]> {
      return this.superThis.http.get<Competition[]>(this.superThis.baseUrl + ApiUrl.Competition.upcomingCompetitions)
        .pipe(map(u => this.convert(u)), catchError((error, u) => {
          if([406].includes(error.status)) {
            console.log("Not upcoming competitions found");
          }
          return throwError(() => new Error(error));
        }));
    }

    currentCompetition(): Observable<Competition[]> {
      return this.superThis.http.get<Competition[]>(this.superThis.baseUrl + ApiUrl.Competition.currentCompetitions)
      .pipe(map(u => this.convert(u)), catchError((error, u) => {
        if([406].includes(error.status)) {
          console.log("Not current competitions found");
        }
        return throwError(() => new Error(error));
      }));
    }

    archiveCompetition(): Observable<Competition[]> {
      return this.superThis.http.get<Competition[]>(this.superThis.baseUrl + ApiUrl.Competition.archiveCompetitions)
      .pipe(map(u => this.convert(u)), catchError((error, u) => {
        if([406].includes(error.status)) {
          console.log("Not archive competitions found");
        }
        return throwError(() => new Error(error));
      }));
    }

    private convert(competition: any): Competition[] {
      for(let comp of competition) {
        let dist: Distance[] = new Array();
        let year: YearGroup[] = new Array();
        for (let item of comp.YearGroups) {
          year.push(new YearGroup(item.StartYear, item.Infinity, item.Gender, item.EndYear));
        }
        for (let item of comp.Distances) {
          dist.push(new Distance(item.Dist, item.Style, item.Gender, this.superThis.competitionsService));
        }
        comp.YearGroups = year;
        comp.Distances = dist;
      }
      return competition;
    }
  }(this);

  public Language = new class {
    constructor(private superThis: ReceivingService) {}

    setLanguage(): Observable<any> {
      return this.superThis.http.post(this.superThis.baseUrl + ApiUrl.Language.set, {});
    }
  }(this)

  public Users = new class {
    constructor(private superThis: ReceivingService) {}

    getUserInfo(id: number): Observable<UserInfo> {
      return this.superThis.http.get<UserInfo>(this.superThis.baseUrl + ApiUrl.Users.get + `/${id}`);
    }
  }(this)  
}
