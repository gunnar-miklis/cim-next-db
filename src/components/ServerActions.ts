'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/prisma/db';
import { zfd } from 'zod-form-data';
import { z } from 'zod'

const formValidator = zfd.formData({
  name: zfd.text(z.string().max(100).optional()),
  email: zfd.text(z.string().min(1, {message: 'Email is required'}).email('Must be a valid email')),
  privacy: zfd.checkbox({ trueValue: 'accept' }),
});

export async function approveSignature(id: string, approve: boolean) {
  if (approve) {
    await prisma.signature.update({
      where: { id },
      data: { approved: true },
    });
  }
  revalidatePath('/petition');
}

export async function deleteSignature(id: string, approve: boolean) {
  await prisma.signature.delete({
    where: { id },
  });
  revalidatePath('/petition');
}

export async function addSignature(formData: FormData) {
  const { name, email, privacy } = formValidator.parse(formData);
  if (name && email) {
    await prisma.signature.create({
      data: {
        name,
        email,
      },
    });
  }

  revalidatePath('/petition');
}
