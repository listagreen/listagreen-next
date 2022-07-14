import prisma from './prisma_client';
import { User } from "@prisma/client";

interface ICreateUserDTO {
  email: string;
  auth0id: string;
}

export async function createUser({
  email,
  auth0id,
}: ICreateUserDTO): Promise<User> {
  const creation = await prisma.user.create({
    data: {
      auth0id,
      email,
    },
  });

  return creation;
}

export async function findByAuthID(auth0id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      auth0id: auth0id,
    },
  });

  return user;
}

export const findAllUsers = async () => {
  const allUsers = await prisma.user.findMany();

  return allUsers;
};
