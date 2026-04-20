import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const jobSchema = new Schema(
  {
    factoryId: { type: Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true },
    title: { type: String, required: true },
    area: { type: String, required: true },
    areas: { type: [String], default: [] },
    reqSkills: { type: [String], default: [] },
    preferredRoles: { type: [String], default: [] },
    shift: { type: String, enum: ['Day', 'Night', 'Rotational', 'General'], required: true },
    payMin: { type: Number, required: true },
    payMax: { type: Number, required: true },
    openings: { type: Number, default: 1 },
    description: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [78.4867, 17.385],
      },
    },
  },
  { timestamps: true },
);

jobSchema.index({ location: '2dsphere' });
jobSchema.index({ title: 1, area: 1, shift: 1, reqSkills: 1 });
jobSchema.index({ title: 'text', description: 'text', reqSkills: 'text', area: 'text' });

export type IJob = InferSchemaType<typeof jobSchema>;
export const Job = model('Job', jobSchema);
