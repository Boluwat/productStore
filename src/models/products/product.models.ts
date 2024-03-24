import { Model, Schema, model } from "mongoose";
import { IProductDocument } from "../../interfaces/product.model";

const productSchema = new Schema<IProductDocument>(
  {
    name: {
      type: String,
    },
    status: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  {
    strict: "throw",
    timestamps: true,
  }
);

interface IProductModel extends Model<IProductDocument> {}
const Product = model<IProductDocument, IProductModel>("Product", productSchema);

export default Product;
