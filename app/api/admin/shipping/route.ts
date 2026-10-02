import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ShipmentModel from '@/lib/models/ShipmentModel';

const SEED_SHIPMENTS = [
  { trackingNumber: 'DHL-98421948', carrier: 'DHL Express', recipient: 'Emma Watson', destination: 'New York, USA', rate: 24.50, status: 'In Transit', estDelivery: 'Oct 30, 2026' },
  { trackingNumber: 'FDX-55102941', carrier: 'FedEx Priority', recipient: 'Liam Johnson', destination: 'London, UK', rate: 38.00, status: 'Delivered', estDelivery: 'Oct 26, 2026' },
  { trackingNumber: 'ARX-77192044', carrier: 'Aramex Domestic', recipient: 'Rashid Al-Mansoor', destination: 'Dubai, UAE', rate: 15.00, status: 'Processing', estDelivery: 'Nov 02, 2026' },
  { trackingNumber: 'DHL-11928401', carrier: 'DHL Express', recipient: 'Lucas Silva', destination: 'Sao Paulo, Brazil', rate: 45.00, status: 'Exception', estDelivery: 'Nov 05, 2026' },
];

export async function GET() {
  try {
    await dbConnect();
    let shipments = await ShipmentModel.find({}).sort({ createdAt: -1 }).lean();
    if (shipments.length === 0) {
      await ShipmentModel.insertMany(SEED_SHIPMENTS);
      shipments = await ShipmentModel.find({}).sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(shipments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const trackingNumber = body.trackingNumber || `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const newShipment = await ShipmentModel.create({ ...body, trackingNumber });
    return NextResponse.json(newShipment, { status: 201 });
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
    await ShipmentModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
