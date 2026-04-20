import { Schema, model, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    userType: { type: String, enum: ['worker', 'factory', 'admin'], required: true },
    companyName: { type: String },
    roles: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
    experienceYears: { type: Number, default: 0 },
    areas: { type: [String], default: [] },
    shiftPreference: { type: [String], default: [] },
    availability: { type: String, default: 'Immediate' },
    salaryPreference: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
    },
    verified: { type: Boolean, default: false },
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

userSchema.index({ location: '2dsphere' });
userSchema.index({ skills: 1, roles: 1, areas: 1, userType: 1 });

export type IUser = InferSchemaType<typeof userSchema>;
export const User = model('User', userSchema);
