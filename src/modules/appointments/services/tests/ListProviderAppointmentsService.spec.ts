import 'reflect-metadata';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const provider_id = 'provider_id';
    const user_id = 'user_id';

    const appointment1 = await fakeAppointmentsRepository.create({
      user_id,
      provider_id,
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      user_id,
      provider_id,
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id,
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });
});
