import { PermissionLevel } from '../models'

export const API_ROUTES = {
  ROOT: {
    route: '/',
    permissionLevel: PermissionLevel.NONE,
  },
  USERS: {
    ROOT: {
      GET_PROFILE: {
        route: '/users',
        permissionLevel: PermissionLevel.USER,
      },
      UPDATE: {
        route: '/users',
        permissionLevel: PermissionLevel.USER,
      },
    },
    ACCESS: {
      SIGNUP: {
        route: '/signup',
        permissionLevel: PermissionLevel.NONE,
      },
      LOGIN: {
        route: '/login',
        permissionLevel: PermissionLevel.NONE,
      },
      REFRESH_TOKEN: {
        route: '/refresh-token',
        permissionLevel: PermissionLevel.USER,
      },
      CHANGE_PASSWORD: {
        route: '/change-pass',
        permissionLevel: PermissionLevel.USER,
      },
    },
    NOTES: {
      GET_NOTES: {
        // TODO: Implement
        route: '/user/notes',
        permissionLevel: PermissionLevel.USER,
      },
      CREATE_NOTE: {
        route: '/users/notes',
        permissionLevel: PermissionLevel.USER,
      },
      UPDATE_NOTE: {
        route: '/users/notes/:userNoteId',
        permissionLevel: PermissionLevel.USER,
      },
      DELETE_NOTE: {
        route: '/users/notes/:userNoteId',
        permissionLevel: PermissionLevel.USER,
      },
    },
    TASKS: {
      GET_TASKS: {
        // TODO: Implement
        route: '/users/tasks',
        permissionLevel: PermissionLevel.USER,
      },
      CREATE_TASK: {
        route: '/users/tasks',
        permissionLevel: PermissionLevel.USER,
      },
      UPDATE_TASK: {
        route: '/users/tasks/:taskId',
        permissionLevel: PermissionLevel.USER,
      },
      DELETE_TASK: {
        route: '/users/tasks/:taskId',
        permissionLevel: PermissionLevel.USER,
      },
    },
  },

  GROUPS: {
    ROOT: {
      CREATE: {
        route: '/groups',
        permissionLevel: PermissionLevel.USER,
      },
      GET: {
        // TODO: Implement
        route: '/groups/:groupId',
        permissionLevel: PermissionLevel.USER,
      },
      UPDATE: {
        route: '/groups/:groupId',
        permissionLevel: PermissionLevel.USER,
      },
      DELETE: {
        // TODO: Implement
        route: '/groups/:groupId',
        permissionLevel: PermissionLevel.USER,
      },
    },
    ACCESS: {
      JOIN: {
        route: '/groups/memberships',
        permissionLevel: PermissionLevel.USER,
      },
      JOIN_REQUEST: {
        route: '/groups/memberships',
        permissionLevel: PermissionLevel.USER,
      },
      LEAVE: {
        route: '/groups/memberships',
        permissionLevel: PermissionLevel.USER,
      },
    },
    NOTES: {
      GET_NOTES: {
        // TODO: Implement
        route: '/groups/:groupId/notes',
        permissionLevel: PermissionLevel.USER,
      },
      CREATE_NOTE: {
        route: '/groups/:groupId/notes',
        permissionLevel: PermissionLevel.USER,
      },
      UPDATE_NOTE: {
        route: '/groups/:groupId/notes/:groupNoteId',
        permissionLevel: PermissionLevel.USER,
      },
      DELETE_NOTE: {
        route: '/groups/:groupId/notes/:groupNoteId',
        permissionLevel: PermissionLevel.USER,
      },
    },
  },
}
