const userFactory = require('../factories/user'),
  { mutations } = require('../../app/graphql/users/mutations');

describe('users', () => {
  describe('resolvers', () => {
    describe('createUser', () => {
      it('should create an user successfuly', async () => {
        const user = await userFactory.build();
        return mutations.user({}, { userFields: user.dataValues }).then(res => {
          expect(res.dataValues).toHaveProperty('id');
          expect(res.dataValues).toHaveProperty('firstName');
          expect(res.dataValues).toHaveProperty('lastName');
          expect(res.dataValues).toHaveProperty('email');
          expect(res.dataValues).toHaveProperty('password');
          expect(res.dataValues).toHaveProperty('updatedAt');
          expect(res.dataValues).toHaveProperty('createdAt');
        });
      });

      it('should fail to create an user with malformed parameters', () => {
        mutations.user({}, { userFields: { a: 'b' } }).catch(err => {
          expect(typeof err).toBe('object');
          expect(err).toHaveProperty('message');
        });
      });
    });
  });
});
