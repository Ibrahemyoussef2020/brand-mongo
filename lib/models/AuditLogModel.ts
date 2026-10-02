import mongoose from 'mongoose';

export interface IAuditLog {
  _id?: string;
  actor: {
    name: string;
    role: string;
    email: string;
  };
  action: string;
  targetResource: string;
  ipAddress: string;
  severity: 'Info' | 'Warning' | 'Critical';
  timestamp: string;
  metadata?: any;
}

const AuditLogSchema = new mongoose.Schema(
  {
    actor: {
      name: { type: String, required: true },
      role: { type: String, required: true },
      email: { type: String, required: true },
    },
    action: { type: String, required: true },
    targetResource: { type: String, required: true },
    ipAddress: { type: String, default: '127.0.0.1' },
    severity: { type: String, enum: ['Info', 'Warning', 'Critical'], default: 'Info' },
    timestamp: { type: String, default: () => new Date().toLocaleString() },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const AuditLogModel = mongoose.models?.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

export default AuditLogModel;
