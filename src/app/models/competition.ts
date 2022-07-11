export class Competition {
    Id!: number;
    Name!: string;
    StartCompetition!: Date;
    EndCompetition!: Date;
    PoolLength!: 25 | 50;
    UserId!: number;

    constructor(
        id: number,
        name: string,
        startCompetition: Date,
        endCompetition: Date,
        poolLength: 25 | 50,
        UserId: number
    ) {
        this.Id = id;
        this.Name = name;
        this.StartCompetition = startCompetition;
        this.EndCompetition = endCompetition;
        this.PoolLength = poolLength;
        this.UserId = UserId;
    }

    getDate(date: Date): string {
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }
}
