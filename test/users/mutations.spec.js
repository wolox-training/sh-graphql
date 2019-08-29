const { mutate } = require('../server.spec');
const { createUser, loginUser } = require('./graphql');
const userFactory = require('../factories/user');
const { User } = require('../../app/models');

describe('users', () => {
  describe('mutations', () => {
    it('should create an user successfully', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(res => {
          const { fullName, email, password, id } = res.data.user;
          expect(fullName).toEqual(`${user.firstName} ${user.lastName}`);
          expect(email).toEqual(user.email);
          expect(password).toBeDefined();
          expect(id).toBeDefined();
        })
      ));

    it('should fail to create an user, because the user already exists', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(() =>
          mutate(createUser(user)).then(response => {
            const { errors } = response;
            expect(response).toHaveProperty('errors');
            expect(errors[0]).toHaveProperty('message', 'invalid user inputs');
          })
        )
      ));

    it('should fail to create an user, due to incorrect fields', () =>
      userFactory.attributes({ email: 'example@domain.com', password: '1234_' }).then(user =>
        mutate(createUser(user)).then(response => {
          const { errors } = response;
          expect(response).toHaveProperty('errors');
          expect(errors[0]).toHaveProperty('message', 'invalid user inputs');
        })
      ));

    it('should fail to create an user, due to a database error', () => {
      const userCreateMock = jest.spyOn(User, 'create').mockImplementation(() => {
        throw Error('Unable to connect to your database server: Connection refused');
      });
      return userFactory.attributes().then(user =>
        mutate(createUser(user)).then(response => {
          const { errors } = response;
          expect(response).toHaveProperty('errors');
          expect(errors[0]).toHaveProperty(
            'message',
            'Unable to connect to your database server: Connection refused'
          );
          userCreateMock.mockRestore();
        })
      );
    });

    it('should login successfully', () =>
      userFactory
        .attributes({ password: '12345678' })
        .then(user => mutate(createUser(user)).then(({ data }) => data.user))
        .then(({ email }) => mutate(loginUser({ email, password: '12345678' })))
        .then(response => {
          const { login } = response.data;
          expect(login).toHaveProperty('accessToken');
          expect(login).toHaveProperty('expiresIn');
        }));

    it('should fail to login, due to the wrong email', () =>
      userFactory
        .attributes({ password: '12345678' })
        .then(user => mutate(createUser(user)))
        .then(() => mutate(loginUser({ email: 'example@wolox.com', password: '12345678' })))
        .then(response => {
          const { errors } = response;
          expect(response).toHaveProperty('errors');
          expect(errors[0]).toHaveProperty('message', 'Your email or password is incorrect');
        }));

    it('should fail to login, due to the wrong password', () =>
      userFactory
        .attributes({ password: '12345678', email: 'example@wolox.com' })
        .then(user => mutate(createUser(user)))
        .then(() => mutate(loginUser({ email: 'example@wolox.com', password: '87654321' })))
        .then(response => {
          const { errors } = response;
          expect(response).toHaveProperty('errors');
          expect(errors[0]).toHaveProperty('message', 'Your email or password is incorrect');
        }));
  });
});
