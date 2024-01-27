import mongoose from "mongoose";

const Bids = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    bidPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    totalBids: [
      {
        user: {
          type: Array,
        },
        bidPrice: {
          type: Number,
        },
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: {
      required: true,
    },
  }
);

export const bids = new mongoose.model("Bids", Bids);
