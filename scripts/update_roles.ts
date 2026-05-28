import dotenv from 'dotenv';
import dbConnect from '../lib/dbConnect';
import UserModel from '../lib/models/UserModel';

dotenv.config({ path: '.env' });

async function main() {
  try {
    await dbConnect();
    console.log('Connected to DB');

    const superAdminEmail = 'ibrahimyoussef.dev@gmail.com';
    const ecommerceAdminEmail = 'ibrahimyoussef95.12@gmail.com';

    // Update super admin
    const superAdminResult = await UserModel.findOneAndUpdate(
      { email: superAdminEmail },
      { role: 'super_admin' },
      { new: true }
    );

    if (superAdminResult) {
      console.log(`Updated ${superAdminEmail} to super_admin`);
    } else {
      console.log(`User ${superAdminEmail} not found`);
    }

    // Update ecommerce admin to unified admin role
    const ecommerceAdminResult = await UserModel.findOneAndUpdate(
      { email: ecommerceAdminEmail },
      { role: 'admin' },
      { new: true }
    );

    if (ecommerceAdminResult) {
      console.log(`Updated ${ecommerceAdminEmail} to admin`);
    } else {
      console.log(`User ${ecommerceAdminEmail} not found`);
    }

    // Convert any remaining legacy admin roles to unified admin
    const legacyAdminsUpdated = await UserModel.updateMany(
      { role: { $in: ['ecommerce_admin', 'pos_admin'] } },
      { role: 'admin' }
    );
    if (legacyAdminsUpdated.matchedCount > 0) {
      console.log(`Converted ${legacyAdminsUpdated.matchedCount} legacy admin users to admin`);
    }

  } catch (error) {
    console.error('Error updating users:', error);
  } finally {
    process.exit(0);
  }
}

main();
