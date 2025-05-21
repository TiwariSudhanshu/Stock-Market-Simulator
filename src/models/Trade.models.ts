import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface ITrade extends Document {
  company: mongoose.Types.ObjectId;
  participant: mongoose.Types.ObjectId;
  round: mongoose.Types.ObjectId;
  tradeType: 'buy' | 'sell';
  quantity: number;
  price: number;
  tradeTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TradeSchema: Schema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  participant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  round: { type: Schema.Types.ObjectId, ref: 'Round', required: true },
  tradeType: { type: String, enum: ['buy', 'sell'], required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  tradeTime: { type: Date, required: true },
}, {
  timestamps: true,
});

const Trade: Model<ITrade> = mongoose.models.Trade || model<ITrade>('Trade', TradeSchema);

export default Trade;
