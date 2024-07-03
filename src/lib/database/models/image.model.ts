import { Document, Schema, model, models } from 'mongoose';
import { IUser } from './user.model';

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureUrl: string | URL;
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

const ImageSchema = new Schema<IImage>(
  {
    title: { type: String, required: true },
    transformationType: { type: String, required: true },
    publicId: { type: String, required: true },
    secureUrl: { type: URL, required: true },
    width: { type: Number },
    height: { type: Number },
    config: { type: Object },
    transformationUrl: { type: URL },
    aspectRatio: { type: String },
    color: { type: String },
    prompt: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const Image = models?.Image || model('Image', ImageSchema);

export default Image;
