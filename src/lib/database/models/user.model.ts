import { Document, Model, Schema, model, models } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName: string;
  lastName?: string;
  planId?: number;
  creditBalance?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    planId: { type: Number, default: 1 },
    creditBalance: { type: Number, default: 10 },
  },
  {
    timestamps: true,
  }
);

const User = (models?.User as Model<IUser>) || model<IUser>('User', UserSchema);

export default User;
