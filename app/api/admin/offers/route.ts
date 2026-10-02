import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import OfferModel from '@/lib/models/OfferModel';

const SEED_OFFERS = [
  { title: 'Flash Deals: 50% Off Smart Watches', badge: 'Flash Sale', discount: '50% OFF', targetCategory: 'Consumer Electronics', status: 'Active', startDate: 'Oct 01, 2026', endDate: 'Nov 01, 2026', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60' },
  { title: 'Summer Outdoor Gadgets Bundle', badge: 'Special Offer', discount: '30% OFF', targetCategory: 'Home & Outdoor', status: 'Active', startDate: 'Oct 10, 2026', endDate: 'Nov 15, 2026', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60' },
  { title: 'Back-to-School Tech Deals', badge: 'Limited Time', discount: '40% OFF', targetCategory: 'Computers & Tech', status: 'Scheduled', startDate: 'Nov 01, 2026', endDate: 'Nov 20, 2026', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60' },
  { title: 'Premium Headphones Clearance', badge: 'Clearance', discount: '65% OFF', targetCategory: 'Audio & Sound', status: 'Expired', startDate: 'Aug 01, 2026', endDate: 'Sep 15, 2026', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60' },
];

export async function GET() {
  try {
    await dbConnect();
    let offers = await OfferModel.find({}).sort({ createdAt: -1 }).lean();
    if (offers.length === 0) {
      await OfferModel.insertMany(SEED_OFFERS);
      offers = await OfferModel.find({}).sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(offers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newOffer = await OfferModel.create(body);
    return NextResponse.json(newOffer, { status: 201 });
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
    const updated = await OfferModel.findByIdAndUpdate(targetId, updateData, { new: true });
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
    await OfferModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
