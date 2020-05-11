import 'reflect-metadata';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
      provider_id: 'provider',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 9, 0, 0),
      provider_id: 'provider',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
      provider_id: 'provider',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 11, 0, 0),
      provider_id: 'provider',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 12, 0, 0),
      provider_id: 'provider',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 13, 0, 0),
      provider_id: 'provider',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
      provider_id: 'provider',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
      provider_id: 'provider',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 16, 0, 0),
      provider_id: 'provider',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 17, 0, 0),
      provider_id: 'provider',
    });

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
      provider_id: 'provider',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      date: new Date(2020, 4, 21, 8, 0, 0),
      provider_id: 'provider',
    });

    const availability = await listMonthAvailability.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
