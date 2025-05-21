import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface ITrade extends Document {
  companyName: string;
  userId: mongoose.Types.ObjectId;
  action: 'buy' | 'sell';
  noOfShares: number;
  pricePerShare: number;
  esgValue: number;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TradeSchema: Schema = new Schema({
  companyName: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, enum: ['buy', 'sell'], required: true },
  noOfShares: { type: Number, required: true },
  pricePerShare: { type: Number, required: true },
  esgValue: { type: Number, required: true },
  timestamp: { type: Date, required: true },
}, {
  timestamps: true,
});

const Trade: Model<ITrade> = mongoose.models.Trade || model<ITrade>('Trade', TradeSchema);

export default Trade;
