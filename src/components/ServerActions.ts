'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/prisma/db';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

const formValidator = zfd.formData({
  name: zfd.text(z.string().max(100).optional()),
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

export async function addSignature(formData: FormData) {
  const { name, email, privacy } = formValidator.parse(formData);
  await prisma.signature.create({
    data: {
      name,
      email,
      approved: privacy,
    },
  });
  revalidatePath('/petition', 'page');
  redirect('/petition');
}
