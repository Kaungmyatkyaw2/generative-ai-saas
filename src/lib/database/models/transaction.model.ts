import { Document, Model, Schema, model, models } from 'mongoose';
import { IUser } from './user.model';

interface ITransaction extends Document {
  stripeId: string;
  amount: number;
  plan?: string;
  credits?: number;
  buyer?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    stripeId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    plan: {
      type: String,
    },
    credits: {
      type: Number,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  (models?.Transaction as Model<ITransaction>) ||
  model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
