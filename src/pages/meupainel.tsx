import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { createUser } from '../../prisma/prisma_handlers';

export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if(user) {
    createUser(user); // verificar se já existe
  }

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.sub}</p>
      </div>
    )
  );
}
