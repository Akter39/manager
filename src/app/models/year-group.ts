export class YearGroup {
    startYear!: Date;
    endYear?: Date;
    infinity!: boolean;

    constructor(startYear: number, infinity: boolean, endYear?: number) {
        this.startYear = new Date(startYear, 1);
        this.infinity = infinity;
        if (!!endYear) {
            if (infinity) throw new Error('Argument excteption');
            this.endYear = new Date(endYear, 1);
        }
    }
}
