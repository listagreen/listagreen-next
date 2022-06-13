import { prisma } from './prisma_client.ts';

export const createUser = async email => {
    const creation = await prisma.user.create({
      data: {
        email: email,
        password: '123456',
        privacy: ['public']
      },
    });
    return creation;
}

export const findByEmail = async email => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export const findAllUsers = async () => {
  const allUsers = await prisma.user.findMany();

  return allUsers;
}