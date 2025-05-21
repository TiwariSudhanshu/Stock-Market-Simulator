import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  mobileNo: string;
  enrollment: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  mobileNo: { type: String, required: true },
  enrollment: { type: String, required: true },
}, {
  timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || model<IUser>('User', UserSchema);

export default User;
