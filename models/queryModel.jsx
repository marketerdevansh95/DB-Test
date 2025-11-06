import { Schema, models, model } from "mongoose";

const querySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
    },
    businessCateogry: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Query = models.Query || model("Query", querySchema);

export default Query;
