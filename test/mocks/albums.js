const nock = require('nock');

const { urlAlbumApi, albumsEndpoint, photosEndpoint } = require('../../config/').common.resources;
const { albumResponse, albumListResponse, albumPhotosResponse } = require('../factories/albums');

exports.albumMock = qs => {
  nock(urlAlbumApi)
    .get(`${albumsEndpoint}${qs}`)
    .reply(200, albumResponse);
};

exports.albumListMock = () => {
  nock(urlAlbumApi)
    .get(`${albumsEndpoint}`)
    .reply(200, albumListResponse);
};

exports.albumPhotosMock = albumId => {
  nock(urlAlbumApi)
    .get(`${photosEndpoint}`)
    .query({ albumId })
    .reply(200, albumPhotosResponse);
};

exports.albumMockApiError = qs => {
  nock(urlAlbumApi)
    .get(`${albumsEndpoint}${qs}`)
    .replyWithError({ message: 'Error consuming album API' });
};

exports.albumPhotosMockFiveTimes = () => {
  for (let index = 1; index <= 5; index++) {
    exports.albumPhotosMock(index);
  }
};
