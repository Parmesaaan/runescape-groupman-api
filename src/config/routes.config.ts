export const API_ROUTES = {
    ROOT: '/',
    USER: {
        LOGIN: '/users/loginUser',
        REGISTER: '/users/registerUser',
        CHANGE_PASSWORD: '/users/change-password',
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