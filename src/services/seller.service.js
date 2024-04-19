import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import { uploadFile, destroyFile } from '../utils/storage';

import { Seller } from '../models/index';

const folderName = 'sellers';

export const querySellers = catchAsync(async (req) => {
  const sellers = await APIFeatures(req, Seller);

  if (!sellers) {
    return {
      status: 'error',
      message: 'noSellers',
      statusCode: 404
    };
  }
  return {
    status: 'success',
    message: 'successfulSellersFound',
    statusCode: 200,
    sellers
  };
});

export const querySeller = catchAsync(async (req) => {
  const { id } = req.params;

  const seller = await Seller.findById(id);

  if (!seller) {
    return {
      status: 'error',
      message: 'noSellerFound',
      statusCode: 404
    };
  }

  return {
    status: 'success',
    message: 'successfulSellerFound',
    statusCode: 200,
    seller
  };
});

export const createSeller = catchAsync(async (req) => {
  const { id } = req.user;
  const { name, logo, category, type, description, city } = req.body;

  if (!name || !description || !city || !category || !logo || !type) {
    return {
      status: 'error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  if (req.files.length > 0) {
    const imagesPromises = req.files.map((image) =>
      uploadFile(image, folderName)
    );
    var imgList = await Promise.all(imagesPromises);
  }

  const body = {
    user: id,
    name,
    logo,
    seller,
    category,
    type,
    description,
    city,
    imgList
  };

  const seller = await Seller.create(body);

  return {
    status: 'success',
    message: 'successfulSellerCreate',
    statusCode: 201,
    seller
  };
});

export const updateSellerDetails = catchAsync(async (req) => {
  const { id } = req.body;
  let imgList = [];

  let seller = await Seller.findById(id);

  if (!seller) {
    return {
      status: 'error',
      message: 'noSellerFound',
      statusCode: 404
    };
  }

  if (req.files.length > 0) {
    const imagesPromises = req.files.map((image) =>
      uploadFile(image, folderName)
    );
    imgList = await Promise.all(imagesPromises);
  }

  let newImgList = [...seller.imgList];
  const bodyImgList = req.body.imgList ? req.body.imgList : [];
  const imagesPromises = seller.imgList.map((image) => {
    const exist = bodyImgList.some((img) => img.id === image.id);
    if (!exist) {
      newImgList.splice(
        newImgList.findIndex((img) => img.id === image.id),
        1
      );
      destroyFile(image.img);
    }
  });
  await Promise.all(imagesPromises);
  newImgList = [...newImgList, ...imgList];

  seller = await Seller.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  return {
    status: 'success',
    message: 'successfulSellerDetails',
    statusCode: 200,
    seller
  };
});

export const deleteSellerById = catchAsync(async (req) => {
  const { id } = req.query;

  const seller = await Seller.findById(id);

  if (!seller) {
    return {
      status: 'error',
      message: 'noSellerFound',
      statusCode: 404
    };
  }

  const imagesPromises = seller.imgList.map((image) => {
    destroyFile(image.img);
  });
  await Promise.all(imagesPromises);

  await Seller.findByIdAndDelete(id);

  return {
    status: 'success',
    message: 'successfulSellerDelete',
    statusCode: 200
  };
});
