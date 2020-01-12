import { isBefore, subHours } from 'date-fns';
import User from '../models/User';
import Appointment from '../models/Appointment';
import Queue from '../../lib/Queue';
import Cache from '../../lib/Cache';
import CancellationMail from '../jobs/CancellationMail';

class CancelAppointmentService {
  async run({ provider_id, user_id }) {
    const appointment = await Appointment.findByPk(provider_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (!appointment) {
      return new Error('Appointment not found');
    }

    if (appointment.user_id !== user_id) {
      return new Error("You don't have permission to cancel this appointment");
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return new Error('You can only cancel appointments 2 hours in advance');
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    await Queue.add(CancellationMail.key, { appointment });

    /**
     * invalidate cache
     */
    await Cache.invalidatePrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CancelAppointmentService();
