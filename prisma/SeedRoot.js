import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  try {
    const documents = [
      {
        name: 'JavaScript',
        text: '',
      },
      {
        name: 'Node',
        text: '',
      },
      {
        name: 'Socket.io',
        text: '',
      },
    ]

    Promise.all(
      documents.map(async (item) => {
        await prisma.document.create({
          data: item,
        })
      }),
    )

    console.log('Seed completed successfully!')
  } catch (error) {
    console.error('Error during seed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
