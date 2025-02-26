export const API_ROUTES = {
  ROOT: '/',
  USER: {
    LOGIN: '/users/login',
    REGISTER: '/users',
    UPDATE_USER: '/users/:userId',
    SEARCH: '/users/search',
  },
  GROUP: {
    CREATE: '/groups',
    JOIN: '/groups/:groupId/join',
    LEAVE: '/groups/:groupId/leave',
    SEARCH: '/groups/search',
  },
  NOTE: {
    CREATE: '/notes',
    UPDATE: '/notes/:noteId',
    SEARCH: '/notes/search',
  },
  TASK: {
    CREATE: '/tasks',
    UPDATE: '/tasks/:taskId',
    SEARCH: '/tasks/search',
  },
}
