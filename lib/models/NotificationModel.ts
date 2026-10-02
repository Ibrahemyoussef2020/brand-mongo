import mongoose from 'mongoose';

export interface INotification {
  _id?: string;
  title: string;
  message: string;
  type: 'Order' | 'Marketing' | 'Security' | 'System';
  audience: 'All Users' | 'Customers' | 'Admins';
  channel: 'In-App & Email' | 'In-App Only' | 'Push Notification';
  status: 'Sent' | 'Scheduled' | 'Draft';
  sentAt: string;
}

const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['Order', 'Marketing', 'Security', 'System'], default: 'Marketing' },
    audience: { type: String, enum: ['All Users', 'Customers', 'Admins'], default: 'All Users' },
    channel: { type: String, enum: ['In-App & Email', 'In-App Only', 'Push Notification'], default: 'In-App & Email' },
    status: { type: String, enum: ['Sent', 'Scheduled', 'Draft'], default: 'Sent' },
    sentAt: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.models?.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default NotificationModel;
