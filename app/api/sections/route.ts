import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { SectionModel } from '@/lib/models/Section';

export async function GET() {
  try {
    await dbConnect();
    const sections = await SectionModel.find({});
    const data = sections.length ? sections : [
      { en: 'products', ar: 'المنتجات' },
      { en: 'dealOffers', ar: 'عروض الصفقات' },
      { en: 'homeConsumer', ar: 'مستهلك المنزل' },
      { en: 'homeOutdoor', ar: 'منزل خارجي' },
      { en: 'homeSections', ar: 'أقسام المنزل' },
      { en: 'recommendedItems', ar: 'عناصر مختارة' },
    ];
    // Return plain JSON array
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Failed to fetch sections', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
