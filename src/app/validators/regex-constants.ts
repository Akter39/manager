

export class RegexConstants {
    public static readonly userName = /^([a-zA-Z])(\w{3,13})[a-zA-Z]$/;
    public static readonly userPassword = /^\w{6,20}$/;
    public static readonly userPhone = /^(\+?\d{1,2})?(\s|-)?((\(\d{3}\))|(\d{3}))(\s|-)?(\d{3})(\s|-)?(\d{2})(\s|-)?(\d{2})$/;
    public static readonly userCity = /^[a-zA-Zа-яА-Я\s\-]{1,20}$/;
    public static readonly userOrganization  = /^[a-zA-Zа-яА-Я0-9\'\"\s\-]{2,30}$/;
    public static readonly userEmail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
}