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
  currentYear!: number;
  yearGroups: YearGroup[] = new Array();
  year: any;
  isSort!: boolean;
  constructor(private competition: CompetitionsService) {
   }

   init() {
    this.initProperties();
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
    this.isSort = true;
   }

   public Men = new class {
    years: Observable<YearBusy[]> = new Observable<YearBusy[]>();
    isInfinity!: boolean;
    constructor(private superThis: YearGroupService) {

    }

    add(startYear: number, infinity: boolean, endYear?: number) {
      if (endYear) {
        if(endYear == this.superThis.currentYear) this.isInfinity = true;
        this.superThis.addYear(startYear, false, Genders.mail, this.years, endYear);
      } else if(infinity) {
        this.isInfinity = true;
        this.superThis.addYear(startYear, true, Genders.mail, this.years);
      } else {
        this.superThis.addYear(startYear, false, Genders.mail, this.years);
      }
    }

    clear() {
      this.years.subscribe(u => {
        for(let item of u) {
          item.isBusy = true;
        }
      })
      this.superThis.yearGroups.filter(u => u.gender == Genders.mail);
      this.isInfinity = false;
    }
   }(this)

   public Women = new class {
    years: Observable<YearBusy[]> = new Observable<YearBusy[]>();
    isInfinity!: boolean;
    constructor(private superThis: YearGroupService) {

    }

    add(startYear: number, infinity: boolean, endYear?: number) {
      if (endYear) {
        if(endYear == this.superThis.currentYear) this.isInfinity = true;
        this.superThis.addYear(startYear, false, Genders.femail, this.years, endYear);
      } else if(infinity) {
        this.isInfinity = true;
        this.superThis.addYear(startYear, true, Genders.femail, this.years);
      } else {
        this.superThis.addYear(startYear, false, Genders.femail, this.years);
      }
    }

    clear() {
      this.years.subscribe(u => {
        for(let item of u) {
          item.isBusy = true;
        }
      })
      this.superThis.yearGroups.filter(u => u.gender == Genders.mail);
      this.isInfinity = false;
    }
   }(this)

   intersection(): Observable<YearBusy[]> {
    let startYear: Observable<YearBusy[]> = new Observable<YearBusy[]>();
    this.Men.years.subscribe(u => {
      this.Women.years.subscribe(x => {
        let result: YearBusy[] = u;
        for(let i = 0; i < u.length; i++) {
          if(result[i].isBusy == false || x[i].isBusy == false) result[i].isBusy = false;
          
        }
        startYear = of(result);
      })
    });
    return startYear;
  }

  private addYear(startYear: number, infinity: boolean, gender: Genders, years: Observable<YearBusy[]>, endYear?: number) {
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
    } else if (infinity) {
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
    } else {
      this.yearGroups.push(new YearGroup(startYear, false, gender));
      years.subscribe(u => {
        for(let i = 0; i < u.length; i++) {
          if(u[i].year == startYear) {
            u[i].isBusy = false;
            break;
          }
        }
      })
    }
    if(this.isSort) this.sort();
  }

  clear() {
    this.Men.clear();
    this.Women.clear();
    this.yearGroups = [];
  }

  isSortToggle() {
    this.isSort = !this.isSort;
    if (this.isSort) {
      this.sort();
    }
  }

  private sort() {
    this.yearGroups.sort((a,b) => {
      if(a.gender == Genders.mail && b.gender == Genders.femail) return 1;
      if(a.gender == Genders.femail && b.gender == Genders.mail) return -1;
      if(a.gender == b.gender) return 0;
      throw new Error('Incorrect yearGroups');
    });
    this.yearGroups.sort((a,b) => {
      if(a.gender != b.gender) return 0;
      if(a.startYear < b.startYear) return 1;
      if(a.startYear > b.startYear) return -1;
      throw new Error('Incorrect yearGroups');
    });
  }
}
