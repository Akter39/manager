export const RegexUser = {
    userName: /^([a-zA-Z])(\w{3,13})([a-zA-Z0-9])$/,
    userPassword: /^\w{6,20}$/,
    userPhone: /^(\+?\d{1,2})?(\s|-)?((\(\d{3}\))|(\d{3}))(\s|-)?(\d{3})(\s|-)?(\d{2})(\s|-)?(\d{2})$/,
    userCity: /^[a-zA-Zа-яА-Я\s\-]{1,20}$/,
    userOrganization : /^[a-zA-Zа-яА-Я0-9\'\"\s\-]{2,30}$/,
    userEmail: /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/
}

export const RegexCompetition = {
    name: /^[a-zA-Zа-яА-Я0-9\'\"\s\-\.]{5,50}$/,
    poolLength: /^25|50$/,
    poolLanes: /^4|8$/,
    
}
