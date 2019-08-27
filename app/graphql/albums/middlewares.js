const logger = require('../../logger');
const { validateSession } = require('../../middlewares/sessions');

const buyAlbum = (resolve, parent, args, contex) => {
  logger.info("Middleware for 'buyAlbum' mutation");
  return validateSession(args, contex).then(() => resolve(parent, args));
};

module.exports = {
  mutations: {
    buyAlbum
  }
};
