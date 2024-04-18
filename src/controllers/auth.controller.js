import catchAsync from '../utils/catchAsync';

import { authService } from '../services';

export const signup = catchAsync(async (req, res) => {
  const { status, message, statusCode, user, tokens } =
    await authService.signup(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: message
    });
  }

  return res.status(statusCode).json({
    status,
    message: message,
    user,
    tokens
  });
});

export const signin = catchAsync(async (req, res) => {
  const { status, message, statusCode, user, tokens } =
    await authService.signin(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: message
    });
  }

  return res.status(statusCode).json({
    status,
    message: message,
    user,
    tokens
  });
});

export const getUserInfo = catchAsync(async (req, res) => {
  const user = req.user;

  if (!user) {
    return {
      status: 'error',
      statusCode: 404,
      message: 'noUserFound'
    };
  }

  return res.status(200).json({
    user
  });
});

export const logout = catchAsync(async (req, res) => {
  const { status, message, statusCode } = await authService.logout(
    req.body.refreshToken
  );

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: message
    });
  }

  return res.status(statusCode).json({
    status,
    message: message
  });
});

export const refreshTokens = catchAsync(async (req, res) => {
  const { status, message, statusCode, tokens } = await authService.refreshAuth(
    req.body.refreshToken
  );

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: message
    });
  }

  return res.status(statusCode).json({
    status,
    message: message,
    tokens
  });
});
