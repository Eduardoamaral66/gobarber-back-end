import 'reflect-metadata';

import ListProviderService from '@modules/appointments/services/ListProvidersService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'old-password',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johndoe@example.com',
      password: 'old-password',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johndoe@example.com',
      password: 'old-password',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
