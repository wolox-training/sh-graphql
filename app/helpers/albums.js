const { albumsMapper } = require('../mappers/albums');

exports.formatAlbum = ({ albums, offset, limit, orderBy }) => {
  const newAlbums = albums.slice(offset, offset + limit);
  const mappedAlbums = albumsMapper(newAlbums);
  return mappedAlbums.sort((element1, element2) => (element1[orderBy] > element2[orderBy] ? 1 : -1));
};
