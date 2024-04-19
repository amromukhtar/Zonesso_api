import mongoose from 'mongoose';
import toJSON from './plugins/index';

const imageSchema = mongoose.Schema({
  id: {
    type: 'string',
    required: true
  },
  name: {
    type: 'string',
    required: true
  },
  img: {
    type: 'string',
    required: true
  }
});

const vehicleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    adsType:{
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    imgList: {
      type: [imageSchema],
      required: true,
      default: []
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    tirm: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    kilometers: {
      type: Number,
      required: true,
      default: 0
    },
    regionalSpecs: {
      type: String,
      required: true
    },
    doors: {
      type: Number,
      required: true
    },
    postedOn: {
      type: Date,
      required: true
    },
    bodyType: {
      type: String,
      required: true
    },
    fuelType: {
      type: String,
      required: true
    },
    sellerType: {
      type: String,
      required: true
    },
    transmissionType: {
      type: String,
      required: true
    },  
    horsepower: {
      type: [Number],
      required: true
    },
    noOfCylinders: {
      type: Number,
      required: true
    }, 
    Warranty: {
      type: Boolean,
      required: true
    },
    exteriorColor: {
      type: String,
      required: true
    },
    interiorColor: {
      type: String,
      required: true
    },
    targetMarket: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

vehicleSchema.plugin(toJSON);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
