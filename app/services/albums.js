const request = require('request-promise');
const DataLoader = require('dataloader');

const { Album } = require('../models');

const { urlAlbumApi, albumsEndpoint, photosEndpoint } = require('../../config').common.resources;
const { ALBUM_API_FAILED, LOG_ALBUM_API_ERROR, LOG_DATABASE_ERROR, DATABASE_ERROR } = require('../constants');
const errors = require('../errors');
const logger = require('../logger');

const getAlbum = qs => {
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

const getAlbums = () => {
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

const getPhotos = id => {
  const options = {
    method: 'GET',
    uri: `${urlAlbumApi}${photosEndpoint}?albumId=${id}`,
    json: true
  };
  return request(options).catch(error => {
    logger.error(`${LOG_ALBUM_API_ERROR}${JSON.stringify(error)}`);
    throw errors.albumError(ALBUM_API_FAILED);
  });
};

exports.findAlbumBy = ({ conditions }) =>
  Album.findOne({
    where: conditions
  }).catch(() => {
    logger.error('Error trying to find the album');
    throw errors.databaseError(DATABASE_ERROR);
  });

exports.albumRegister = album =>
  Album.create(album).catch(error => {
    logger.error(`${LOG_DATABASE_ERROR}${JSON.stringify(error)}`);
    throw errors.databaseError(`${DATABASE_ERROR}`);
  });

exports.albumByIdLoader = new DataLoader(keys => Promise.all(keys.map(getAlbum)));
exports.albumsLoader = new DataLoader(keys => Promise.all(keys.map(getAlbums)));
exports.photosLoader = new DataLoader(keys => Promise.all(keys.map(getPhotos)));
