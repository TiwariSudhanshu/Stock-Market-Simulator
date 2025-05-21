import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  mobileNo: string;
  enrollment: string;
  portfolioValue: {
    total: number;
    normalized: number;
  };
  esgScore: {
    average: number;
    normalized: number;
  };
  sectorsInvested: {
    total: number;
    normalized: number;
  };
  finalScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNo: { type: String, required: true },
  enrollment: { type: String, required: true },

  portfolioValue: {
    total: { type: Number, default: 0 },
    normalized: { type: Number, default: 0 },
  },

  esgScore: {
    average: { type: Number, default: 0 },
    normalized: { type: Number, default: 0 },
  },

  sectorsInvested: {
    total: { type: Number, default: 0 },
    normalized: { type: Number, default: 0 },
  },

  finalScore: { type: Number, default: 0 },

}, {
  timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || model<IUser>('User', UserSchema);

export default User;
