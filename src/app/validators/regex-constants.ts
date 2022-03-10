

export class RegexConstants {
    public static userName = /^([a-zA-Z])(\w{3,13})[a-zA-Z]$/;
    public static userPassword = /^\w{6,20}$/;
    public static userPhone = /^(\+?\d{1,2})?(\s|-)?((\(\d{3}\))|(\d{3}))(\s|-)?(\d{3})(\s|-)?(\d{2})(\s|-)?(\d{2})$/;
    public static userCity = /^[a-zA-Zа-яА-Я\s\-]{1,20}$/;
    public static userOrganization  = /^[a-zA-Zа-яА-Я0-9\'\"\s\-]{2,30}$/;
}