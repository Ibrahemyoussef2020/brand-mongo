import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import bcrypt from 'bcryptjs';
import UserModel from '../lib/models/UserModel';

// Fix Node.js DNS SRV resolution on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  console.warn('Could not set custom DNS servers:', e);
}

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const accounts = [
  {
    name: 'Super Admin',
    email: 'superadmin@brand.com',
    passwordPlain: 'superadmin@brand.com',
    role: 'super_admin',
  },
  {
    name: 'User 1',
    email: 'user1@brand.com',
    passwordPlain: 'superadmin@brand.com',
    role: 'user',
  },
  {
    name: 'Seller 1',
    email: 'seller1@brand.com',
    passwordPlain: 'seller1@brand.com',
    role: 'seller',
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB successfully.');

  for (const acc of accounts) {
    const hashedPassword = await bcrypt.hash(acc.passwordPlain, 10);

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: acc.email },
      {
        name: acc.name,
        email: acc.email,
        password: hashedPassword,
        role: acc.role,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`[OK] Seeded account: ${acc.email} | Role: ${acc.role} | ID: ${updatedUser._id}`);
  }

  console.log('\nAll 3 accounts seeded successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Error seeding accounts:', err);
  process.exit(1);
});
