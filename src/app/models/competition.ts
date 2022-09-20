import { YearGroup } from './year-group';
import { UserInfo } from './auth/user-info';
import { Distance } from './distance';
export class Competition {
    Id!: number;
    Name!: string;
    StartCompetition!: Date;
    EndCompetition!: Date;
    PoolLength!: 25 | 50;
    PoolLanes!: 4 | 8;
    BidDate!: Date;
    Contribution!: number;
    Individual!: boolean;
    InvitOnly!: boolean;
    MaxMembers!: number;
    MaxComands!: number;
    MaxComandMembers!: number;
    CurrentMembers!: number;
    CurrentComands!: number;
    Distances!: Distance[];
    YearGroups!: YearGroup[];
    UserId!: number;
}
