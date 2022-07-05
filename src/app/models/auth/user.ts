import { Role } from "./role";

export class User {
    Id!: number;
    Nickname!: string;
    Organization!: string;
    City!: string;
    Roles!: Role[];
    Token!: string;
}
