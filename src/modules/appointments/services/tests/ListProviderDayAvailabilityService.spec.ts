import 'reflect-metadata';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
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

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listDayAvailability.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
