const albumService = require('../../services/albums');
const { albumMapper } = require('../../mappers/albums');
const logger = require('../../logger');

exports.getAlbum = (parent, { id }) => {
  logger.info(`Retrieving album with id: ${id}`);
  return albumService.getAlbums(id).then(albumMapper);
};

exports.getPhotos = (parent, args) => {
  const { id } = parent ? parent : args;
  logger.info(`Retrieving photos from the album with AlbumId: ${id}`);
  return albumService.getPhotosBy({ albumId: id });
};

exports.photosResolver = {
  photos: exports.getPhotos
};
