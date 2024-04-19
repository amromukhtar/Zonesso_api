import catchAsync from '../utils/catchAsync';
import { sellerService } from '../services/index';

export const getAllSellers = catchAsync(async (req, res) => {
  const { status, message, statusCode, sellers } =
    await sellerService.querySellers(req);

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
    sellers
  });
});

export const getSeller = catchAsync(async (req, res) => {
  const { status, message, statusCode, seller } =
    await sellerService.querySeller(req);

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
    seller
  });
});

export const addSeller = catchAsync(async (req, res) => {
  const { status, message, statusCode, seller } =
    await sellerService.createSeller(req);

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
    seller
  });
});

export const updateSellerDetails = catchAsync(async (req, res) => {
  const { status, message, statusCode, seller } =
    await sellerService.updateSellerDetails(req);

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
    seller
  });
});

export const deleteSeller = catchAsync(async (req, res) => {
  const { status, message, statusCode } = await sellerService.deleteSellerById(
    req
  );

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
