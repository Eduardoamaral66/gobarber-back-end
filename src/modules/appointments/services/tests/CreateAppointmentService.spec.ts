import 'reflect-metadata';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      user_id: 'user_id',
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create a two appointments on the same time', async () => {
    const date = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      user_id: 'user_id',
      date,
      provider_id: '123123',
    });

    expect(
      createAppointment.execute({
        user_id: 'user_id',
        date,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
