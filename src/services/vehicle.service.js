import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import { uploadFile, destroyFile } from '../utils/storage';

import { Vehicle } from '../models/index';

const folderName = 'vehicles';

export const queryCategories = catchAsync(async (req) => {
  const vehicles = await APIFeatures(req, Vehicle);

  if (!vehicles) {
    return {
      status: 'error',
      message: 'noCategories',
      statusCode: 404
    };
  }
  return {
    status: 'success',
    message: 'successfulCategoriesFound',
    statusCode: 200,
    vehicles
  };
});

export const queryVehicle = catchAsync(async (req) => {
  const { id } = req.params;

  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    return {
      status: 'error',
      message: 'noVehicleFound',
      statusCode: 404
    };
  }

  return {
    status: 'success',
    message: 'successfulVehicleFound',
    statusCode: 200,
    vehicle
  };
});

export const createVehicle = catchAsync(async (req) => {
  const { id } = req.user;
  const {
    adsType,
    name,
    category,
    description,
    city,
    price,
    tirm,
    year,
    regionalSpecs,
    doors,
    postedOn,
    bodyType,
    fuelType,
    sellerType,
    transmissionType,
    horsepower,
    noOfCylinders,
    Warranty,
    exteriorColor,
    interiorColor,
    targetMarket
  } = req.body;

  if (
    !adsType ||
    !name ||
    !category ||
    !description ||
    !city ||
    !price ||
    !tirm ||
    !year ||
    !regionalSpecs ||
    !doors ||
    !postedOn ||
    !bodyType ||
    !fuelType ||
    !sellerType ||
    !transmissionType ||
    !horsepower ||
    !noOfCylinders ||
    !Warranty ||
    !exteriorColor ||
    !interiorColor ||
    !targetMarket
  ) {
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
    adsType,
    name,
    category,
    description,
    city,
    price,
    tirm,
    year,
    regionalSpecs,
    doors,
    postedOn,
    bodyType,
    fuelType,
    sellerType,
    transmissionType,
    horsepower,
    noOfCylinders,
    Warranty,
    exteriorColor,
    interiorColor,
    targetMarket,
    imgList
  };

  const vehicle = await Vehicle.create(body);

  return {
    status: 'success',
    message: 'successfulVehicleCreate',
    statusCode: 201,
    vehicle
  };
});

export const updateVehicleDetails = catchAsync(async (req) => {
  const { id } = req.body;
  let imgList = [];

  let vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    return {
      status: 'error',
      message: 'noVehicleFound',
      statusCode: 404
    };
  }

  if (req.files.length > 0) {
    const imagesPromises = req.files.map((image) =>
      uploadFile(image, folderName)
    );
    imgList = await Promise.all(imagesPromises);
  }

  let newImgList = [...vehicle.imgList];
  const bodyImgList = req.body.imgList ? req.body.imgList : [];
  const imagesPromises = vehicle.imgList.map((image) => {
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

  vehicle = await Vehicle.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  return {
    status: 'success',
    message: 'successfulVehicleDetails',
    statusCode: 200,
    vehicle
  };
});

export const deleteVehicleById = catchAsync(async (req) => {
  const { id } = req.query;

  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    return {
      status: 'error',
      message: 'noVehicleFound',
      statusCode: 404
    };
  }

  const imagesPromises = vehicle.imgList.map((image) => {
    destroyFile(image.img);
  });
  await Promise.all(imagesPromises);

  await Vehicle.findByIdAndDelete(id);

  return {
    status: 'success',
    message: 'successfulVehicleDelete',
    statusCode: 200
  };
});
