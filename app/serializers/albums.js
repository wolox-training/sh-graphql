exports.albumSerializer = album => ({
  id: album.id,
  title: album.title,
  artist: album.userId
});

exports.albumsSerializer = albums => albums.map(exports.albumSerializer);
