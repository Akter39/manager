import { UserInfo } from './user-info';
export class Competition {
    Id!: number;
    Name!: string;
    StartCompetition!: Date;
    EndCompetition!: Date;
    PoolLength!: 25 | 50;
    UserInf!: UserInfo;

    constructor(
        id: number,
        name: string,
        startCompetition: Date,
        endCompetition: Date,
        poolLength: 25 | 50,
        userInfo: UserInfo
    ) {
        this.Id = id;
        this.Name = name;
        this.StartCompetition = startCompetition;
        this.EndCompetition = endCompetition;
        this.PoolLength = poolLength;
        this.UserInf = userInfo;
    }

    getDate(date: Date): string {
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }
}
