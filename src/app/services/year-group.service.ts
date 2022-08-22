import { YearGroup } from '../models/year-group';
import { YearBusy } from '../models/year-busy';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Genders } from 'src/app/models/distance';
import { CompetitionsService } from './competitions.service';

@Injectable({
  providedIn: 'root'
})
export class YearGroupService {
  private isInit: boolean;
  currentYear!: number;
  yearGroups: YearGroup[] = new Array();
  year: any;
  freeYearMen: any;
  constructor(private competition: CompetitionsService) {
    this.isInit = false;
   }

   init() {
    this.initProperties();
    this.isInit = true;
   }

   private initProperties() {
    this.currentYear = new Date().getFullYear();
    let bufferMen: YearBusy[] = new Array();
    let bufferWomen: YearBusy[] = new Array();
    for (let i = this.currentYear; i >= 1900; i--) {
      bufferMen.push({year: i, isBusy: true});
      bufferWomen.push({year: i, isBusy: true});
    }
    this.Men.years = of(bufferMen);
    this.Women.years = of(bufferWomen);
    this.Men.isInfinity = false;
    this.Women.isInfinity = false;
   }

   public Men = new class {
    years: Observable<YearBusy[]> = new Observable<YearBusy[]>();
    isInfinity!: boolean;
    constructor(private superThis: YearGroupService) {

    }

    add(startYear: number, endYear?: number) {
      if (endYear) this.superThis.addYear(startYear, Genders.mail, this.years, endYear);
      else
      this.superThis.addYear(startYear, Genders.mail, this.years);
    }
   }(this)

   public Women = new class {
    years: Observable<YearBusy[]> = new Observable<YearBusy[]>();
    isInfinity!: boolean;
    constructor(private superThis: YearGroupService) {

    }

    add(startYear: number, endYear?: number) {
      if (endYear) this.superThis.addYear(startYear, Genders.femail, this.years, endYear);
      else
      this.superThis.addYear(startYear, Genders.femail, this.years);
    }
   }(this)

   intersection(): Observable<YearBusy[]> {
    let startYear: Observable<YearBusy[]> = new Observable<YearBusy[]>();
    this.Men.years.subscribe(u => {
      this.Women.years.subscribe(x => {
        let men = u.filter(u => u.isBusy);
        let women = x.filter(u => u.isBusy);
        let result = men.filter(u => {
          for (let item of women) {
            if (item.year == u.year) return true;
          }
          return false;
        })
        startYear = of(result);
      })
    });
    return startYear;
    //throw new Error('Error get intersetcion startYear');
  }

  addYear(startYear: number, gender: Genders, years: Observable<YearBusy[]>, endYear?: number) {
    if (endYear) {
      this.yearGroups.push(new YearGroup(startYear, false, gender, endYear));
      years.subscribe(u => {
        let start: number = -1;
        let end: number = -1;
        for (let i = 0; i < u.length; i++) {
          if(u[i].year == endYear) start = i;
          if(u[i].year == startYear) {
            end = i;
            break;
          }
        }
        if(end == -1 || start == -1) throw new Error('startYear or endYear is incorrect');
        for(let i = start; i <= end; i++) {
            u[i].isBusy = false;
        }
      });
    } else {
      this.yearGroups.push(new YearGroup(startYear, true, gender));
      years.subscribe(u => {      
        let end: number = -1;
        for (let i = 0; i < u.length; i++) {
          if(u[i].year == startYear) {
            end = i;
            break;
          }
        }
        if(end == -1) throw new Error('startYear or endYear is incorrect');
        for(let i = 0; i <= end; i++) {
            u[i].isBusy = false;
        }
      });
    }
  }
}
