import mongoose from "mongoose";
import { format } from "morgan";

const adSchema = new mongoose.Schema({
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
    },
    latRad: {
      type: Number,
      required: true,
    },
    lonRad: {
      type: Number,
      required: true,
    },
    radiusRad: {
      type: Number,
      required: true,
    },
  },
  image: {
    name: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
});

const Ad = mongoose.model("Ad", adSchema);

export default Ad;
