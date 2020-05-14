import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const createAppointment = container.resolve(CreateAppointmentService);
    const { provider_id, date } = request.body;

    const appointment = await createAppointment.execute({
      user_id,
      provider_id,
      date,
    });

    return response.json(appointment);
  }
}
