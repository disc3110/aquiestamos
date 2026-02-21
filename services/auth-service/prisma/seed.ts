import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const vancouverSlug = 'vancouver-bc';

  const existing = await prisma.metroArea.findUnique({
    where: { slug: vancouverSlug },
  });

  if (!existing) {
    await prisma.metroArea.create({
      data: {
        name: 'Vancouver',
        country: 'Canada',
        slug: vancouverSlug,
        timezone: 'America/Vancouver',
      },
    });
    console.log('✅ Seeded MetroArea: Vancouver');
  } else {
    console.log('🗂 MetroArea Vancouver already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
