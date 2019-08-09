const request = require('request-promise');

const { urlAlbumApi, albumsEndpoint, photosEndpoint } = require('../../config').common.resources;
const { ALBUM_API_FAILED, LOG_ALBUM_API_ERROR } = require('../constants');
const errors = require('../errors');
const logger = require('../logger');

exports.getAlbum = qs => {
  const options = {
    method: 'GET',
    uri: `${urlAlbumApi}${albumsEndpoint}${qs}`,
    json: true
  };
  return request(options).catch(error => {
    logger.error(`${LOG_ALBUM_API_ERROR}${JSON.stringify(error)}`);
    throw errors.albumError(ALBUM_API_FAILED);
  });
};

exports.getAlbums = () => {
  const options = {
    method: 'GET',
    uri: `${urlAlbumApi}${albumsEndpoint}`,
    json: true
  };
  return request(options).catch(error => {
    logger.error(`${LOG_ALBUM_API_ERROR}${JSON.stringify(error)}`);
    throw errors.albumError(ALBUM_API_FAILED);
  });
};

exports.getPhotosBy = qs => {
  const options = {
    method: 'GET',
    uri: `${urlAlbumApi}${photosEndpoint}`,
    qs,
    json: true
  };
  return request(options).catch(error => {
    logger.error(`${LOG_ALBUM_API_ERROR}${JSON.stringify(error)}`);
    throw errors.albumError(ALBUM_API_FAILED);
  });
};
