import { Genders } from 'src/app/models/distance';
export class YearGroup {
    startYear: number;
    endYear?: number;
    infinity: boolean;
    gender: Genders;

    constructor(startYear: number, infinity: boolean, gender: Genders, endYear?: number) {
        this.startYear = startYear;
        this.infinity = infinity;
        this.gender = gender;
        if (!!endYear) {
            if (infinity) throw new Error('Argument excteption');
            this.endYear = endYear;
        }
    }
}
