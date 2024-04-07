import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import PowerSourceService from './powerSource.service';

// create PowerSource
const createPowerSource = catchAsync(async (req, res) => {
  const result = await PowerSourceService.createPowerSource(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Power Source created successfully.',
    data: result,
  });
});

// get all power source
const getAllPowerSource = catchAsync(async (req, res) => {
  const result = await PowerSourceService.getAllPowerSource();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Power source retrieved successfully.',
    data: result,
  });
});

const PowerSourceController = {
  createPowerSource,
  getAllPowerSource,
};

export default PowerSourceController;