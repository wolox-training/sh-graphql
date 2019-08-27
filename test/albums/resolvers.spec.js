const { mutations } = require('../../app/graphql/albums/mutations');
const userMutation = require('../../app/graphql/users/mutations');
const userFactory = require('../factories/user');
const { albumMock } = require('../mocks/albums');
const { albumResponse } = require('../factories/albums');
const { Album } = require('../../app/models');

const id = 1;

describe('albums', () => {
  beforeEach(() => {
    albumMock(id);
  });
  describe('resolvers', () => {
    describe('buyAlbums', () => {
      it('should buy an album successfully', () =>
        userFactory
          .build()
          .then(user => userMutation.mutations.user({}, { userFields: user.dataValues }))
          .then(() => mutations.buyAlbum({}, { albumId: id, user: { id } }))
          .then(({ dataValues }) => {
            expect(dataValues).toHaveProperty('id');
            expect(dataValues).toHaveProperty('title', albumResponse.title);
            expect(dataValues).toHaveProperty('artist', albumResponse.userId);
            expect(dataValues).toHaveProperty('userId');
          }));

      it('should fail to make a duplicate purchase of an album', () =>
        userFactory
          .build()
          .then(user => userMutation.mutations.user({}, { userFields: user.dataValues }))
          .then(() => mutations.buyAlbum({}, { albumId: id, user: { id } }))
          .then(() => mutations.buyAlbum({}, { albumId: id, user: { id } }))
          .catch(error => {
            expect(error).toHaveProperty('message', 'Duplicate purchase of an album is not allowed');
          }));

      it('should fail to buy an album, due to a database error', () => {
        const albumCreateMock = jest.spyOn(Album, 'create').mockImplementation(() => {
          throw Error('Unable to connect to your database server: Connection refused');
        });
        return userFactory
          .build()
          .then(user => userMutation.mutations.user({}, { userFields: user.dataValues }))
          .then(() => mutations.buyAlbum({}, { albumId: id, user: { id } }))
          .catch(error => {
            expect(error).toHaveProperty(
              'message',
              'Unable to connect to your database server: Connection refused'
            );
            albumCreateMock.mockRestore();
          });
      });
    });
  });
});
