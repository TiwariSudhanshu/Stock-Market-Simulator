import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'participant' | 'company';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'participant', 'company'], required: true },
}, {
  timestamps: true,
});

const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;
