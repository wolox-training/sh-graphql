const { mutate } = require('../server.spec'),
  { createUser } = require('./graphql'),
  userFactory = require('../factories/user');

describe('users', () => {
  describe('mutations', () => {
    it('should create an user successfuly', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(res => {
          const { firstName, lastName, email, password, id } = res.data.user;
          expect(firstName).toEqual(user.firstName);
          expect(lastName).toEqual(user.lastName);
          expect(email).toEqual(user.email);
          expect(password).toBeDefined();
          expect(id).toBeDefined();
        })
      ));

    it('should fail to create a user, because the user already exists', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(() =>
          mutate(createUser(user)).then(response => {
            const { errors } = response;
            expect(response).toHaveProperty('errors');
            expect(errors[0]).toHaveProperty('message', 'invalid user inputs');
          })
        )
      ));

    it('should fail to create a user, due to incorrect fields', () =>
      userFactory.attributes({ email: 'example@domain.com', password: '1234_' }).then(user =>
        mutate(createUser(user)).then(response => {
          const { errors } = response;
          expect(response).toHaveProperty('errors');
          expect(errors[0]).toHaveProperty('message', 'invalid user inputs');
        })
      ));
  });
});
