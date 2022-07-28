export const ApiUrl = {
    Auth: {
        signUp: 'api/sign-up',
        signIn: 'api/sign-in',
        refreshJwt: 'api/sign-in/refresh-jwt',
        revokeJwt: 'api/sign-in/revoke-jwt'
    },
    Competition: {
        newCompetitions: 'api/competition/create',
        editCompetitions: 'api/competition/edit',
        deleteCompetitions: 'api/competition/delete',
        calendarCompetitions: 'api/competition/calendar',
        currentCompetitions: 'api/competition/current',
        archiveCompetitions: 'api/competition/archive',
        searchCompetitions: 'api/competition/search',
    }
}
