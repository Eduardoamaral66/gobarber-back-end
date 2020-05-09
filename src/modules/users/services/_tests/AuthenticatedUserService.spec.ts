import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const email = 'johndoe@example.com';
    const password = '123456';

    const user = await createUser.execute({
      name: 'John Doe',
      email,
      password,
    });

    const response = await authService.execute({ email, password });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const email = 'johndoe@example.com';
    const password = '123456';

    expect(authService.execute({ email, password })).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const email = 'johndoe@example.com';

    await createUser.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    expect(
      authService.execute({ email, password: 'wrong-pass' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
