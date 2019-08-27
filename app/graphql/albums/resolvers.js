const albumService = require('../../services/albums');
const { albumSerializer } = require('../../serializers/albums');
const { formatAlbum } = require('../../helpers/albums');
const logger = require('../../logger');

exports.getAlbum = (parent, { id }) => {
  logger.info(`Retrieving album with id: ${id}`);
  return albumService.getAlbum(id).then(albumSerializer);
};

exports.getPhotos = (parent, args) => {
  const { id } = parent ? parent : args;
  logger.info(`Retrieving photos from the album with AlbumId: ${id}`);
  return albumService.getPhotosBy({ albumId: id });
};

exports.getAlbums = (parent, { offset, limit, orderBy, filter }) => {
  logger.info(`Retrieving albums list with offset: ${offset} limit: ${limit} orderBy: ${orderBy}`);
  return albumService.getAlbums().then(albums => formatAlbum({ albums, offset, limit, orderBy, filter }));
};

exports.photosResolver = {
  photos: exports.getPhotos
};
