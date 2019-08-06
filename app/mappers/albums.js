exports.albumMapper = album => ({
  id: album.id,
  title: album.title,
  artist: album.userId
});
