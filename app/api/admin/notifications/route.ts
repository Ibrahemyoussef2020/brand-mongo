import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import NotificationModel from '@/lib/models/NotificationModel';

const SEED_NOTIFICATIONS = [
  { title: 'Flash Weekend Sale is Live!', message: 'Enjoy up to 50% discount on select consumer electronics and accessories this weekend only.', type: 'Marketing', audience: 'All Users', channel: 'In-App & Email', status: 'Sent', sentAt: 'Oct 26, 2026' },
  { title: 'Payment Gateway Maintenance Notice', message: 'Stripe payments scheduled maintenance on Sunday 2:00 AM UTC for 15 minutes.', type: 'System', audience: 'All Users', channel: 'In-App Only', status: 'Sent', sentAt: 'Oct 25, 2026' },
  { title: 'Unusual Login Activity Detected', message: 'Security alert: Multiple failed login attempts recorded from an unfamiliar IP address.', type: 'Security', audience: 'Admins', channel: 'In-App & Email', status: 'Sent', sentAt: 'Oct 24, 2026' },
  { title: 'November Super Savings Teaser', message: 'Early bird access for VIP members starting next week.', type: 'Marketing', audience: 'Customers', channel: 'Push Notification', status: 'Scheduled', sentAt: 'Nov 01, 2026' },
];

export async function GET() {
  try {
    await dbConnect();
    let notifications = await NotificationModel.find({}).sort({ createdAt: -1 }).lean();
    if (notifications.length === 0) {
      await NotificationModel.insertMany(SEED_NOTIFICATIONS);
      notifications = await NotificationModel.find({}).sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(notifications);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newNotification = await NotificationModel.create(body);
    return NextResponse.json(newNotification, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    await NotificationModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
