'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/prisma/db';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import type { InitalFormState } from './Form';

const formValidator = zfd.formData({
  name: zfd.text(z.string().max(48).optional()),
  email: zfd.text(
    z.string().min(1, { message: 'Email is required' }).email('Must be a valid email'),
  ),
  privacy: zfd.checkbox({ trueValue: 'accept' }),
});

export async function approveSignature(id: string, approve: boolean) {
  await prisma.signature.update({
    where: { id },
    data: { approved: approve },
  });
  revalidatePath('/petition', 'page');
}

export async function deleteSignature(id: string) {
  await prisma.signature.delete({ where: { id } });
  revalidatePath('/petition', 'page');
}

export async function addSignature(prevState: unknown, formData: FormData) {
  const response: InitalFormState = {
    status: null,
    message: '',
  };

  const { success, data, error } = formValidator.safeParse(formData);
  if (!success) {
    response.status = 'error';
    response.message = JSON.parse(error.message)[0].message || 'Wrong input';
    return response;
  }

  const { name, email, privacy } = data;
  if (!privacy) {
    response.status = 'error';
    response.message = 'Must accept the privacy terms';
    return response;
  }

  const emailAlreadyExists = await prisma.signature.findUnique({ where: { email } });
  if (emailAlreadyExists) {
    response.status = 'error';
    response.message = 'Email already used';
    return response;
  }

  await prisma.signature.create({
    data: {
      name: name?.trim(),
      email: email.trim().toLowerCase(),
    },
  });

  revalidatePath('/petition', 'page');

  response.status = 'ok';
  response.message = 'Signature added';
  return response;
}
