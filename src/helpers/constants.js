module.exports = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  STATUS: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  },
  MESSAGES: {
    SUCCESS: {
      SYNC_OK: 'SYNC_OK'
    },
    ERROR: {
      USER_NOT_FOUND: 'No user found.',
      UNAUTHORIZE: 'Unauthorized.'
    }
  }
};