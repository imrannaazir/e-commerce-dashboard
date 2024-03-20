import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createOrderValidationSchema } from './order.validation';
import OrderController from './order.controller';
import auth from '../../middlewares/auth';

const router = Router();

// create order
router.post(
  '/',
  auth('user', 'manager'),
  validateRequest(createOrderValidationSchema),
  OrderController.createOrder,
);

// get all order
router.get('/', auth('user', 'manager'), OrderController.getAllOrder);
const OrderRoute = router;
export default OrderRoute;
