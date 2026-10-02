import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import AuditLogModel from '@/lib/models/AuditLogModel';

const SEED_LOGS = [
  {
    actor: { name: 'Super Admin', role: 'super_admin', email: 'superadmin@brand.com' },
    action: 'USER_ROLE_UPDATE',
    targetResource: 'User: seller1@brand.com (role: seller)',
    ipAddress: '192.168.1.10',
    severity: 'Warning',
    timestamp: 'Oct 26, 2026, 04:12 PM',
    metadata: { previousRole: 'user', newRole: 'seller', triggeredBy: 'superadmin@brand.com' }
  },
  {
    actor: { name: 'Super Admin', role: 'super_admin', email: 'superadmin@brand.com' },
    action: 'PRODUCT_UPDATE',
    targetResource: 'Product: Sony WH-1000XM5 (ID: 6512a)',
    ipAddress: '192.168.1.10',
    severity: 'Info',
    timestamp: 'Oct 26, 2026, 02:30 PM',
    metadata: { field: 'price', oldVal: 349.99, newVal: 329.99 }
  },
  {
    actor: { name: 'System Security', role: 'system', email: 'system@brand.internal' },
    action: 'FAILED_LOGIN_ATTEMPT',
    targetResource: 'Auth: /api/auth/callback/credentials',
    ipAddress: '45.132.19.88',
    severity: 'Critical',
    timestamp: 'Oct 25, 2026, 11:45 PM',
    metadata: { reason: 'Invalid password threshold exceeded', attempts: 5 }
  },
  {
    actor: { name: 'Admin', role: 'admin', email: 'admin@brand.com' },
    action: 'SETTINGS_UPDATE',
    targetResource: 'System Configuration: Currency & Gateway',
    ipAddress: '10.0.0.15',
    severity: 'Info',
    timestamp: 'Oct 25, 2026, 09:15 AM',
    metadata: { section: 'general', currency: 'USD' }
  }
];

export async function GET() {
  try {
    await dbConnect();
    let logs = await AuditLogModel.find({}).sort({ createdAt: -1 }).lean();
    if (logs.length === 0) {
      await AuditLogModel.insertMany(SEED_LOGS);
      logs = await AuditLogModel.find({}).sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(logs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newLog = await AuditLogModel.create(body);
    return NextResponse.json(newLog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
