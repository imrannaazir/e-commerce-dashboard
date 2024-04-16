import { Types } from 'mongoose';

export type TCategory = {
  _id: Types.ObjectId;
  title: string;
  collection: Types.ObjectId;
  description?: string;
  image?: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
