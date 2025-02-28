import {PermissionLevel} from "../models";

export const API_ROUTES = {
  ROOT: {
    route: '/',
    permissionLevel: PermissionLevel.NONE
  },
  SIGNUP: { // TODO: Implement
    route: '/signup',
    permissionLevel: PermissionLevel.NONE
  },
  LOGIN: {
    route: '/login',
    permissionLevel: PermissionLevel.NONE
  },
  REFRESH_TOKEN: {
    route: '/refresh-token',
    permissionLevel: PermissionLevel.NONE
  },
  CHANGE_PASSWORD: {
    route: '/change-pass',
    permissionLevel: PermissionLevel.USER
  },
  USERS: {
    GET: { // TODO: Implement
      route: '/user',
      permissionLevel: PermissionLevel.USER
    },
    GET_NOTES: { // TODO: Implement
      route: '/user/notes',
      permissionLevel: PermissionLevel.USER
    },
    CREATE_NOTE: { // TODO: Implement
      route: '/users/notes',
      permissionLevel: PermissionLevel.USER
    },
    UPDATE_NOTE: { // TODO: Implement
      route: '/users/notes/:noteId',
      permissionLevel: PermissionLevel.USER
    },
    DELETE_NOTE: { // TODO: Implement
      route: '/users/notes/:noteId',
      permissionLevel: PermissionLevel.USER
    },
    GET_TASKS: { // TODO: Implement
      route: '/users/tasks',
      permissionLevel: PermissionLevel.USER
    },
    CREATE_TASK: { // TODO: Implement
      route: '/users/tasks',
      permissionLevel: PermissionLevel.USER
    },
    UPDATE_TASK: { // TODO: Implement
      route: '/users/tasks/:taskId',
      permissionLevel: PermissionLevel.USER
    },
    DELETE_TASK: { // TODO: Implement
      route: '/users/tasks/:taskId',
      permissionLevel: PermissionLevel.USER
    },
  },

  GROUPS: {
    CREATE: {
      route: '/groups',
      permissionLevel: PermissionLevel.USER
    },
    GET: { // TODO: Implement
      route: '/groups/:groupId',
      permissionLevel: PermissionLevel.ADMIN
    },
    UPDATE: { // TODO: Implement
      route: '/groups/:groupId',
      permissionLevel: PermissionLevel.ADMIN
    },
    DELETE: { // TODO: Implement
      route: '/groups/:groupId',
      permissionLevel: PermissionLevel.ADMIN
    },
    JOIN: {
      route: '/groups/:groupId/join-requests',
      permissionLevel: PermissionLevel.USER
    },
    JOIN_REQUEST: {
      route: '/groups/:groupId/join-requests',
      permissionLevel: PermissionLevel.USER
    },
    LEAVE: {
      route: '/groups/:groupId/leave',
      permissionLevel: PermissionLevel.USER
    },
    GET_NOTES: { // TODO: Implement
      route: '/groups/:groupId/notes',
      permissionLevel: PermissionLevel.USER
    },
    CREATE_NOTE: { // TODO: Implement
      route: '/groups/:groupId/notes',
      permissionLevel: PermissionLevel.USER
    },
    UPDATE_NOTE: { // TODO: Implement
      route: '/groups/:groupId/notes/:noteId',
      permissionLevel: PermissionLevel.USER
    },
    DELETE_NOTE: { // TODO: Implement
      route: '/groups/:groupId/notes/:noteId',
      permissionLevel: PermissionLevel.USER
    },
  },
}
