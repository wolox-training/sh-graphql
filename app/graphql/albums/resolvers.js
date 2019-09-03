const albumService = require('../../services/albums');
const { albumSerializer } = require('../../serializers/albums');
const { formatAlbum } = require('../../helpers/albums');
const logger = require('../../logger');
const errors = require('../../errors');

exports.getAlbum = (parent, { id }) => {
  logger.info(`getAlbum method start, retrieving album with id: ${id}`);
  return albumService.albumByIdLoader.load(id).then(albumSerializer);
};

exports.getPhotos = (parent, args) => {
  const { id } = parent ? parent : args;
  logger.info(`getPhotos method start, retrieving photos from the album with AlbumId: ${id}`);
  return albumService.photosLoader.load(id);
};

exports.getAlbums = (parent, { offset, limit, orderBy, filter }) => {
  logger.info(
    `getAlbums method start, retrieving albums list with offset: ${offset} limit: ${limit} orderBy: ${orderBy}`
  );
  return albumService.albumsLoader
    .load(0)
    .then(albums => formatAlbum({ albums, offset, limit, orderBy, filter }));
};

exports.buyAlbum = (parent, { albumId, user }) => {
  logger.info(`buyAlbum method start, buying the album with id: ${albumId}`);
  return albumService
    .findAlbumBy({ conditions: { id: albumId } })
    .then(purchasedAlbum => {
      if (purchasedAlbum) {
        logger.error('The album you are trying to buy has already been purchased before');
        throw errors.buyAlbumError('Duplicate purchase of an album is not allowed');
      }
      return exports.getAlbum(parent, { id: albumId }).then(album => {
        album.userId = user.id;
        return albumService.albumRegister(album);
      });
    })
    .catch(error => {
      logger.error(`Error trying to buy album. Details: ${JSON.stringify(error)}`);
      throw error;
    });
};

exports.photosResolver = {
  photos: exports.getPhotos
};
