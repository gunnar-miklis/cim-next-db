'use server';

import { zfd } from 'zod-form-data';
import { z } from 'zod';
import prisma from '@/prisma/db';
import type { EventFormResponse } from './Form';

export async function addEvent(prevState: unknown, formData: FormData) {
  const response: EventFormResponse = {
    status: null,
    message: '',
    newEventId: null,
  };

  const dS = formData.get('dateStart') as string;
  const startDate = new Date(dS);

  const formValidator = zfd.formData({
    name: zfd.text(z.string().min(2, 'Name is required').max(100, 'Name is to long')),
    description: zfd.text(z.string().min(2).max(1000).optional()),
    dateStart: zfd.text(z.coerce.date()),
    dateEnd: zfd.text(
      z.coerce.date().min(startDate, 'End date must be after start date').optional(),
    ),
    venueId: zfd.text(z.coerce.number().positive().int()),
    categoryIds: zfd.repeatable(
      z.array(z.coerce.number().positive().int()).nonempty('Choose at least 1 category'),
    ),
  });

  const { success, data, error } = formValidator.safeParse(formData);
  if (!success) {
    console.log('JSON.parse(error.message)[0] :>> ', JSON.parse(error.message)[0]);
    response.status = 'error';
    response.message = JSON.parse(error.message)[0].message || 'Wrong input';
    return response;
  }

  const { name, description, dateStart, dateEnd, venueId, categoryIds } = data;

  const newEvent = await prisma.event.create({
    data: {
      name: name.trim(),
      description: description?.trim(),
      dateStart,
      dateEnd,
      venueId,
      categories: {
        connect: categoryIds.map((categoryId) => ({ id: categoryId })),
      },
    },
  });

  response.status = 'ok';
  response.message = 'Event added';
  response.newEventId = newEvent.id;
  return response;
}
