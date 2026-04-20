import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const messageSchema = new Schema(
  {
    from: { type: Types.ObjectId, ref: 'User', required: true },
    to: { type: Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
  },
  { timestamps: true },
);

messageSchema.index({ from: 1, to: 1, createdAt: -1 });

export type IMessage = InferSchemaType<typeof messageSchema>;
export const Message = model('Message', messageSchema);
