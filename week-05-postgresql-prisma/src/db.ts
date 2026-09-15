import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [{ emit: 'event', level: 'query' }]
});

let queryCount = 0;
prisma.$on('query', () => { queryCount++; });

export { queryCount };
export const resetQueryCount = () => { queryCount = 0; };
export default prisma;