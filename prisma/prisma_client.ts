const { PrismaClient } = require('@prisma/client')

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: any
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma