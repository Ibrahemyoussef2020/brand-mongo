import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CategoryModel from '@/lib/models/CategoryModel';

export const dynamic = 'force-dynamic';

const SEED_CATEGORIES = [
  { name: { en: 'Consumer Electronics', ar: 'إلكترونيات استهلاكية' }, slug: 'electronics', itemCount: 428, featured: true, status: 'Active', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
  { name: { en: 'Home & Outdoor', ar: 'المنزل والحديقة' }, slug: 'home-outdoor', itemCount: 312, featured: true, status: 'Active', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60' },
  { name: { en: 'Mobile & Tech Accessories', ar: 'ملحقات الهواتف والتقنية' }, slug: 'mobiles', itemCount: 564, featured: true, status: 'Active', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60' },
  { name: { en: 'Fashion & Apparel', ar: 'الأزياء والملابس' }, slug: 'fashion', itemCount: 689, featured: false, status: 'Active', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60' },
  { name: { en: 'Kitchen & Interior Tools', ar: 'أدوات المطبخ والديكور' }, slug: 'kitchen-tools', itemCount: 195, featured: false, status: 'Pending', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60' },
  { name: { en: 'Sports & Outdoor Equipment', ar: 'الرياضة والأنشطة الخارجية' }, slug: 'sports', itemCount: 142, featured: false, status: 'Active', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60' },
];

export async function GET() {
  try {
    await dbConnect();
    let categories = await CategoryModel.find({}).sort({ createdAt: -1 }).lean();
    if (categories.length === 0) {
      await CategoryModel.insertMany(SEED_CATEGORIES);
      categories = await CategoryModel.find({}).sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newCategory = await CategoryModel.create(body);
    return NextResponse.json(newCategory, { status: 201 });
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
    const updated = await CategoryModel.findByIdAndUpdate(targetId, updateData, { new: true });
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
    await CategoryModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
