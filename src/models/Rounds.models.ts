import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface IRound extends Document {
  roundNumber: number;
  startTime: Date;
  endTime: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RoundSchema: Schema = new Schema({
  roundNumber: { type: Number, required: true, unique: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  description: { type: String },
}, {
  timestamps: true,
});

const Round: Model<IRound> = mongoose.models.Round || model<IRound>('Round', RoundSchema);

export default Round;
