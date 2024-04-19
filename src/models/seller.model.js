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

const sellerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    logo: {
      type: imageSchema,
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
    type: {
      type: String,
      required: true,
      default: 'showroom'
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

sellerSchema.plugin(toJSON);

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
