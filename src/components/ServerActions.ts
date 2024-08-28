'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/prisma/db';

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

export async function addSignature( formData: FormData) {
	

  await prisma.signature.create({
    data: {
      name,
      email,
    },
  });
  revalidatePath('/petition');
}
