import { User } from "./user";

export interface ConditionSignIn {
    Successful: boolean;
    InvalidSignIn: boolean;
    InvalidLoginFormat: boolean;
    InvalidPasswordFormat: boolean;
    CurrentUser?: User;
  }