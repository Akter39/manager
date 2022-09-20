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

   init(yearGroups: YearGroup[] = []) {
    this.initProperties(yearGroups);
   }

   private initProperties(yearGroups: YearGroup[]) {
    this.yearGroups = yearGroups;
    console.log(yearGroups);
    console.log(this.yearGroups);
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
        this.superThis.addDeleteYear(startYear, false, Genders.mail, this.years, true, endYear);
      } else if(infinity) {
        this.isInfinity = true;
        this.superThis.addDeleteYear(startYear, true, Genders.mail, this.years, true);
      } else {
        this.superThis.addDeleteYear(startYear, false, Genders.mail, this.years, true);
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
        this.superThis.addDeleteYear(startYear, false, Genders.femail, this.years, true, endYear);
      } else if(infinity) {
        this.isInfinity = true;
        this.superThis.addDeleteYear(startYear, true, Genders.femail, this.years, true);
      } else {
        this.superThis.addDeleteYear(startYear, false, Genders.femail, this.years, true);
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
        let result: YearBusy[] = u.map(u => ({...u}));
        for(let i = 0; i < u.length; i++) {
          if(result[i].isBusy == false || x[i].isBusy == false) result[i].isBusy = false;
          
        }
        startYear = of(result);
      })
    });
    return startYear;
  }

  private addDeleteYear(startYear: number,
      infinity: boolean,
      gender: Genders,
      years: Observable<YearBusy[]>,
      isAdd: boolean,
      endYear?: number) {
    let busy: boolean = true;
      if(isAdd) busy = false;
    if (endYear) {
      if(isAdd) this.yearGroups.push(new YearGroup(startYear, false, gender, endYear));
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
            u[i].isBusy = busy;
        }
      });
    } else if (infinity) {
      if(isAdd) this.yearGroups.push(new YearGroup(startYear, true, gender));
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
            u[i].isBusy = busy;
        }
      });
    } else {
      if(isAdd) this.yearGroups.push(new YearGroup(startYear, false, gender));
      years.subscribe(u => {
        for(let i = 0; i < u.length; i++) {
          if(u[i].year == startYear) {
            u[i].isBusy = busy;
            break;
          }
        }
      })
    }
    if(this.isSort && isAdd) this.sort();
  }

  deleteItem(i: number) {
    let gender;
    let group = this.yearGroups[i];
    if(group.gender == Genders.mail) gender = this.Men;
    else
    gender = this.Women;

    if (group.endYear) {
      if(group.endYear == this.currentYear) gender.isInfinity = false;
      this.addDeleteYear(group.startYear, false, group.gender, gender.years, false, group.endYear);
    } else if(group.infinity) {
      gender.isInfinity = false;
      this.addDeleteYear(group.startYear, true, group.gender, gender.years, false);
    } else {
      this.addDeleteYear(group.startYear, false, group.gender, gender.years, false);
    }
    this.yearGroups.splice(i, 1);
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
