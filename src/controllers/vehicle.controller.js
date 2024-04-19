import catchAsync from '../utils/catchAsync';
import { vehicleService } from '../services/index';

export const getAllVehicles = catchAsync(async (req, res) => {
  const { status, message, statusCode, vehicles } =
    await vehicleService.queryVehicles(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message),
      statusCode
    });
  }

  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message),
    vehicles
  });
});

export const getVehicle = catchAsync(async (req, res) => {
  const { status, message, statusCode, vehicle } =
    await vehicleService.queryVehicle(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message),
      statusCode
    });
  }

  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message),
    vehicle
  });
});

export const addVehicle = catchAsync(async (req, res) => {
  const { status, message, statusCode, vehicle } =
    await vehicleService.createVehicle(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message),
      statusCode
    });
  }

  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message),
    vehicle
  });
});

export const updateVehicleDetails = catchAsync(async (req, res) => {
  const { status, message, statusCode, vehicle } =
    await vehicleService.updateVehicleDetails(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message),
      statusCode
    });
  }

  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message),
    vehicle
  });
});

export const deleteVehicle = catchAsync(async (req, res) => {
  const { status, message, statusCode } =
    await vehicleService.deleteVehicleById(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message),
      statusCode
    });
  }

  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message)
  });
});
