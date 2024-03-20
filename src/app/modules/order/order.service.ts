import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import Product from '../product/product.model';
import { TOrder } from './order.interface';
import mongoose, { Types } from 'mongoose';
import Order from './order.model';
import moment from 'moment';
import QueryBuilder from '../../builder/QueryBuilder';
import User from '../user/user.model';

// create order
const createOrder = async (payload: TOrder, userId: Types.ObjectId) => {
  const { product, quantity } = payload;

  // check is product exist
  const isProductExist = await Product.findById(product);
  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not founded.');
  }

  // if order quantity is more than product quantity
  if (quantity > isProductExist.quantity) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Requested quantity exceeds available stock.',
    );
  }

  payload.soldAt = new Date(payload.soldAt);
  payload.createdBy = userId;
  payload.totalCost = payload.quantity * isProductExist.price;
  //   payload.createdBy = user.userId

  // transaction and rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create order
    const order = await Order.create([payload], { session });

    if (!order[0]) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create order.');
    }

    // update product
    const updatedProduct = await Product.findByIdAndUpdate(
      isProductExist._id,
      {
        $inc: { quantity: -order[0].quantity },
        status:
          isProductExist.quantity - payload.quantity === 0
            ? 'out-of-stock'
            : 'in-stock',
      },
      { session, new: true, runValidators: true },
    );

    if (!updatedProduct) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to processing order.',
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return order;
  } catch (error) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create a order.');
  }
};

// getAllOrder
const getAllOrder = async (
  query: Record<string, unknown>,
  userEmail: string,
) => {
  //check is user exist
  const isUserExist = await User.findOne({ email: userEmail });

  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Account not founded.');
  }

  if (isUserExist.role === 'user') {
    query.createdBy = `${isUserExist._id}`;
  }

  let startTime;
  const date = query?.date;
  if (date && date === 'day') {
    startTime = moment().subtract(24, 'hours').toDate();
  } else if (date === 'week') {
    startTime = moment().subtract(7, 'days').toDate();
  } else if (date === 'month') {
    startTime = moment().subtract(30, 'days').toDate();
  } else if (date === 'year') {
    startTime = moment().subtract(365, 'days').toDate();
  } else {
    startTime = undefined;
  }
  const endOTime = moment().toDate();

  const orderModelQuery = new QueryBuilder(
    Order.find(
      startTime
        ? {
            $and: [
              { soldAt: { $gte: startTime } },
              { soldAt: { $lt: endOTime } },
            ],
          }
        : {},
    ).populate({
      path: 'product',
      select: 'name',
    }),
    query,
  )
    .search(['buyer_name'])
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await orderModelQuery.modelQuery;
  const meta = await orderModelQuery.countTotal();
  return { result, meta };
};

const OrderService = {
  createOrder,
  getAllOrder,
};

export default OrderService;
