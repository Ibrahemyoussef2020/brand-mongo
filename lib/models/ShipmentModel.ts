import mongoose from 'mongoose';

export interface IShipment {
  _id?: string;
  trackingNumber: string;
  carrier: string;
  recipient: string;
  destination: string;
  rate: number;
  status: 'In Transit' | 'Delivered' | 'Processing' | 'Exception';
  estDelivery: string;
}

const ShipmentSchema = new mongoose.Schema(
  {
    trackingNumber: { type: String, required: true, unique: true },
    carrier: { type: String, required: true },
    recipient: { type: String, required: true },
    destination: { type: String, required: true },
    rate: { type: Number, required: true },
    status: { type: String, enum: ['In Transit', 'Delivered', 'Processing', 'Exception'], default: 'Processing' },
    estDelivery: { type: String, required: true },
  },
  { timestamps: true }
);

const ShipmentModel = mongoose.models?.Shipment || mongoose.model<IShipment>('Shipment', ShipmentSchema);

export default ShipmentModel;
