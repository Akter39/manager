

export interface ConditionSignUp {
    Successful: boolean;
    NameBusy: boolean;
    NicknameBusy: boolean;
    EmailBusy: boolean;
    PhoneBusy: boolean;
    NotMatchPasswords: boolean;
    MatchName: boolean;
    InvalidNameFormat: boolean;
    InvalidNicknameFormat: boolean;
    InvalidEmailFormat: boolean;
    InvalidPhoneFormat: boolean;
    InvalidPasswordFormat: boolean;
    InvalidCityFormat: boolean;
    InvalidOrganizationFormat: boolean;
  }