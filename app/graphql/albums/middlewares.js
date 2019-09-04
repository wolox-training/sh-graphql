/* eslint-disable max-params */
const logger = require('../../logger');
const { validateSession } = require('../../middlewares/sessions');
const { findInCache } = require('../../cache/validateCache');

const buyAlbum = (resolve, parent, args, contex) => {
  logger.info("Middleware for 'buyAlbum' mutation");
  return validateSession(args, contex).then(() => resolve(parent, args));
};

const album = (resolve, parent, args, contex, info) => {
  logger.info("Middleware for 'getAlbum' query");
  return findInCache(resolve, parent, args, contex, info);
};

const albums = (resolve, parent, args, contex, info) => {
  logger.info("Middleware for 'getAlbums' query");
  return findInCache(resolve, parent, args, contex, info);
};

const photos = (resolve, parent, args, contex, info) => {
  logger.info("Middleware for 'getPhotos' query");
  return findInCache(resolve, parent, args, contex, info);
};

module.exports = {
  mutations: {
    buyAlbum
  },
  queries: {
    album,
    albums
  },
  photosResolver: {
    photos
  }
};
