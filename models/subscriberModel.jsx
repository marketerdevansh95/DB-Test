import { Schema, models, model } from "mongoose";

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // Adds createdAt, updatedAt
);

const Subscriber =
  models.Subscriber || model("Subscriber", subscriberSchema);

export default Subscriber;
