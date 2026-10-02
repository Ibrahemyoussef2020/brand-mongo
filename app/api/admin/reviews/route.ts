import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ReviewModel from '@/lib/models/ReviewModel';

const SEED_REVIEWS = [
  { customer: 'Alexander Wright', email: 'alex.wright@example.com', productTitle: 'Sony WH-1000XM5 Wireless Headphones', rating: 5, comment: 'Exceptional active noise cancellation and crystal clear audio fidelity. Highly recommend for frequent travelers!', status: 'Approved', date: 'Oct 24, 2026' },
  { customer: 'Sophia Chen', email: 'sophia.c@example.com', productTitle: 'Apple iPad Pro 12.9 M2', rating: 4, comment: 'Great screen quality and battery life. Only minus is the heavy weight when combined with the Magic Keyboard.', status: 'Approved', date: 'Oct 22, 2026' },
  { customer: 'Marcus Brody', email: 'marcus.b@example.com', productTitle: 'Smart Mechanical Gaming Keyboard', rating: 2, comment: 'Keys started sticking after two weeks. Requested replacement from vendor.', status: 'Pending', date: 'Oct 21, 2026' },
  { customer: 'Elena Rostova', email: 'elena.r@example.com', productTitle: 'Outdoor Waterproof Solar Power Bank', rating: 1, comment: 'Spam review containing suspicious referral links.', status: 'Flagged', date: 'Oct 19, 2026' },
];

export async function GET() {
  try {
    await dbConnect();
    let reviews = await ReviewModel.find({}).sort({ createdAt: -1 }).lean();
    if (reviews.length === 0) {
      await ReviewModel.insertMany(SEED_REVIEWS);
      reviews = await ReviewModel.find({}).sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(reviews);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newReview = await ReviewModel.create(body);
    return NextResponse.json(newReview, { status: 201 });
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
    const updated = await ReviewModel.findByIdAndUpdate(targetId, updateData, { new: true });
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
    await ReviewModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
