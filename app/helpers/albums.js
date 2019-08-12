const { albumsMapper } = require('../mappers/albums');

exports.formatAlbum = ({ albums, offset, limit, orderBy, filter }) => {
  const newAlbums = albums.slice(offset, offset + limit);
  const mappedAlbums = albumsMapper(newAlbums);
  const filteredAlbums = mappedAlbums.filter(album => album.title.includes(filter));
  return filteredAlbums.sort((element1, element2) => (element1[orderBy] > element2[orderBy] ? 1 : -1));
};
