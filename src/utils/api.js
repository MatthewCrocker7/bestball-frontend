const urls = {
    // User
    register: '/api/user/register',
    login: '/api/user/login',
    logout: '/api/user/logout',
    // Info
    getTeamInfo: '/api/info/getTeamInfo',
    // Game
    newGame: '/api/game/newGame',
    // PGA
    upcomingTournaments: '/api/pga/upcomingTournaments',
    // Socket Connection
    socketDraft: '/connect/draft',
    socketGame: '/connect/game',
    // Socket Subscriptions
    refreshDraft: (draftId) => {
        return `/ui/refreshDraft/${draftId}`;
    },
    // Socket Publishers
    loadDraft: (draftId) => {
        return `/draft/loadDraft/${draftId}`;
    }
};
module.exports = urls;
