const { expires_in } = require('../../config').common.session;

exports.tokenSerializer = token => ({
  accessToken: token,
  expiresIn: expires_in,
  refreshToken: ''
});
