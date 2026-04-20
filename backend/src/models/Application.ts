import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const applicationSchema = new Schema(
  {
    jobId: { type: Types.ObjectId, ref: 'Job', required: true },
    workerId: { type: Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'], default: 'Applied' },
    fitScore: { type: Number, default: 0 },
  },
  { timestamps: true },
);

applicationSchema.index({ jobId: 1, workerId: 1 }, { unique: true });

export type IApplication = InferSchemaType<typeof applicationSchema>;
export const Application = model('Application', applicationSchema);
