export const API_ROUTES = {
    ROOT: '/',
    USER: {
        LOGIN: '/users/login',
        REGISTER: '/users',
        UPDATE_USER: '/users/:userId',
    },
    GROUP: {
        CREATE: '/groups',
        JOIN: '/groups/join',
        LEAVE: '/groups/leave',
    },
    NOTE: {
        CREATE: '/notes',
        UPDATE: '/notes/:noteId'
    },
    TASK: {
        CREATE: '/task',
        UPDATE: '/task/:taskId'
    }
}