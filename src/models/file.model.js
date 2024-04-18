import mongoose from 'mongoose';
import toJSON from './plugins/index';

const fileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      required: true,
      default: 0
    },
    uri: {
      type: String,
      required: true
    },
    tag: {
      type: String
    }
  },
  { timestamps: true }
);

fileSchema.plugin(toJSON);

const File = mongoose.model('File', fileSchema);

export default File;
