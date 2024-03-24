/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProductDTO } from "../../interfaces/product.model";

export const mapProductStoreModelToDTO = (product: any): IProductDTO => ({
  id: product._id.toString(),
  name: product.name,
  status: product.status,
  price: product.price,
  quantity: product.quantity,
  description: product.description,
  createdAt: product?.createdAt,
  updatedAt: product?.updatedAt,
});
