export const API_ROUTES = {
    ROOT: '/',
    USER: {
        LOGIN: '/users/login',
        REGISTER: '/users',
        UPDATE_USER: '/users/:userId',
    },
    GROUP: {
        CREATE: '/groups',
        JOIN: '/groups/:groupId/join',
        LEAVE: '/groups/:groupId/leave',
    },
    NOTE: {
        CREATE: '/notes',
        UPDATE: '/notes/:noteId',
    },
    TASK: {
        CREATE: '/tasks',
        UPDATE: '/tasks/:taskId',
    }
}