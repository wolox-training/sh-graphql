const nock = require('nock');

const { query } = require('../server.spec');
const { getAlbum, getAlbums } = require('./graphql');
const {
  albumMock,
  albumListMock,
  albumPhotosMock,
  albumPhotosMockFiveTimes,
  albumMockApiError
} = require('../mocks/albums');
const { albumResponse } = require('../factories/albums');
const albumService = require('../../app/services/albums');

const id = 1;

describe('albums', () => {
  describe('queries', () => {
    it('should get album properly', () => {
      albumMock(id);
      albumPhotosMock(id);
      return query(getAlbum(id)).then(response => {
        const { album } = response.data;
        expect(response.data).toHaveProperty('album');
        expect(album).toHaveProperty('photos');
        expect(album.id).toEqual(albumResponse.id.toString());
        expect(album.title).toEqual(albumResponse.title);
        expect(album.artist).toEqual(albumResponse.userId.toString());
      });
    });

    it('should get album list properly', () => {
      nock.cleanAll();
      albumListMock();
      albumPhotosMockFiveTimes();
      return query(getAlbums({})).then(response => {
        const { albums } = response.data;
        expect(response.data).toHaveProperty('albums');
        expect(albums).toHaveLength(5);
      });
    });

    it('should get the list of paginated albums properly', () => {
      nock.cleanAll();
      albumListMock();
      albumPhotosMockFiveTimes();
      return query(getAlbums({ offset: 0, limit: 2, orderBy: 'id' })).then(response => {
        const { albums } = response.data;
        expect(response.data).toHaveProperty('albums');
        expect(albums[0].id < albums[1].id).toBe(true);
        expect(albums).toHaveLength(2);
      });
    });

    it('should fail to get an album by API error', () => {
      nock.cleanAll();
      albumMockApiError(id);
      albumService.albumByIdLoader.clearAll();
      return query(getAlbum(id)).then(response => {
        expect(response).toHaveProperty('errors');
        expect(response.errors[0]).toHaveProperty('message', 'Error consuming album API');
      });
    });
  });
});
