import { PrismaClient } from '@prisma/client'

interface PrismaClientWithIndex extends PrismaClient {
  [key: string]: any
}

const prisma: PrismaClientWithIndex = new PrismaClient()

export class ConnectionBdPrisma {
  async queryDatabase<T>(
    query: (prisma: PrismaClient) => Promise<T>,
  ): Promise<T> {
    try {
      return await query(prisma)
    } finally {
      await prisma.$disconnect()
    }
  }
}
