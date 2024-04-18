import catchAsync from './catchAsync';
import AppError from './appError';

const apiFeatures = catchAsync(async (req, model, populate) => {
  let query;

  const reqQuery = { ...req.query };
  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach((param) => delete reqQuery[param]);

  query = model.find(reqQuery);

  if (!query) {
    throw new AppError('No Data Found', 400);
  }

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  query = query.sort({ createdAt: -1 });

  if (populate) {
    query = query.populate(populate);
  }

  query = await query;

  return query;
});

export default apiFeatures;
