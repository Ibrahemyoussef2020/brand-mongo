import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CouponModel from '@/lib/models/CouponModel';

export const dynamic = 'force-dynamic';

const SEED_COUPONS = [
  { code: 'SUMMER2026', discountType: 'percentage', discountValue: 20, minSpend: 150, usageCount: 68, usageLimit: 200, status: 'Active', expiresAt: 'Nov 30, 2026' },
  { code: 'VIPTECH50', discountType: 'fixed', discountValue: 50, minSpend: 300, usageCount: 142, usageLimit: 150, status: 'Active', expiresAt: 'Dec 15, 2026' },
  { code: 'FREESHIP10', discountType: 'fixed', discountValue: 10, minSpend: 50, usageCount: 310, usageLimit: 500, status: 'Active', expiresAt: 'Dec 31, 2026' },
  { code: 'FLASH35', discountType: 'percentage', discountValue: 35, minSpend: 200, usageCount: 100, usageLimit: 100, status: 'Expired', expiresAt: 'Oct 01, 2026' },
];

export async function GET() {
  try {
    await dbConnect();
    let coupons = await CouponModel.find({}).sort({ createdAt: -1 }).lean();
    if (coupons.length === 0) {
      await CouponModel.insertMany(SEED_COUPONS);
      coupons = await CouponModel.find({}).sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(coupons);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newCoupon = await CouponModel.create(body);
    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, id, ...updateData } = body;
    const targetId = _id || id;
    const updated = await CouponModel.findByIdAndUpdate(targetId, updateData, { new: true });
    return NextResponse.json(updated);
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
    await CouponModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
