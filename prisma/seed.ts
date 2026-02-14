import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'Admin123!';

const MOCK_LEADS = [
  { name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '+1-555-0101', status: 'NEW' as const, value: 2500 },
  { name: 'Bob Smith', email: 'bob.smith@example.com', phone: '+1-555-0102', status: 'CONTACTED' as const, value: 5200 },
  { name: 'Carol Williams', email: 'carol.williams@example.com', phone: '+1-555-0103', status: 'QUALIFIED' as const, value: 15000 },
  { name: 'David Brown', email: 'david.brown@example.com', phone: '+1-555-0104', status: 'LOST' as const, value: 800 },
  { name: 'Eve Davis', email: 'eve.davis@example.com', phone: '+1-555-0105', status: 'NEW' as const, value: 3200 },
  { name: 'Frank Miller', email: 'frank.miller@example.com', phone: '+1-555-0106', status: 'CONTACTED' as const, value: 7500 },
  { name: 'Grace Wilson', email: 'grace.wilson@example.com', phone: '+1-555-0107', status: 'QUALIFIED' as const, value: 22000 },
  { name: 'Henry Moore', email: 'henry.moore@example.com', phone: '+1-555-0108', status: 'NEW' as const, value: 1100 },
  { name: 'Ivy Taylor', email: 'ivy.taylor@example.com', phone: '+1-555-0109', status: 'LOST' as const, value: 4500 },
  { name: 'Jack Anderson', email: 'jack.anderson@example.com', phone: '+1-555-0110', status: 'CONTACTED' as const, value: 9800 },
  { name: 'Kate Thomas', email: 'kate.thomas@example.com', phone: '+1-555-0111', status: 'QUALIFIED' as const, value: 18500 },
  { name: 'Leo Jackson', email: 'leo.jackson@example.com', phone: '+1-555-0112', status: 'NEW' as const, value: 4100 },
  { name: 'Mia White', email: 'mia.white@example.com', phone: '+1-555-0113', status: 'LOST' as const, value: 1200 },
  { name: 'Noah Harris', email: 'noah.harris@example.com', phone: '+1-555-0114', status: 'CONTACTED' as const, value: 6300 },
  { name: 'Olivia Martin', email: 'olivia.martin@example.com', phone: '+1-555-0115', status: 'QUALIFIED' as const, value: 27500 },
];

async function seedAdmin(): Promise<void> {
  const existing = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existing) {
    console.log('Admin user already exists, skipping creation.');
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      password: hashedPassword,
    },
  });
  console.log('Admin user created.');
}

async function seedLeads(): Promise<void> {
  const existingCount = await prisma.lead.count();
  if (existingCount > 0) {
    console.log(`Leads already exist (${existingCount}), skipping lead seed.`);
    return;
  }

  const leadPassword = await bcrypt.hash('LeadPass1!', 10);

  await prisma.lead.createMany({
    data: MOCK_LEADS.map((lead) => ({
      name: lead.name,
      email: lead.email,
      password: leadPassword,
      phone: lead.phone,
      status: lead.status,
      value: lead.value,
    })),
  });
  console.log(`${MOCK_LEADS.length} mock leads created.`);
}

async function main(): Promise<void> {
  await seedAdmin();
  await seedLeads();
}

main()
  .then(() => {
    console.log('Seed completed successfully.');
  })
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
