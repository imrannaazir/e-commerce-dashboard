import { Types } from 'mongoose';

export type TBrand = {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  logo?: Types.ObjectId;
  cover_photo?: Types.ObjectId;
  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};