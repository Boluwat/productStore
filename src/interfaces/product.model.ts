import { Document } from "mongoose";


export interface IProductDocument extends Document {
  name: string;
  status: string;
  quantity: number;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProductDTO {
    name: string;
    quantity: number;
    price: number;
    description: string;
}

export interface IUpdateProductDTO {
    name?: string;
    quantity?: number;
    price?: number;
    description?: string;
    // id?: string
}

export interface IProductDTO {
  id: string;
  name: string;
  status: string;
  quantity: number;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface IGetProductsResponseDTO {
  products: IProductDTO[];
  pageCount: number;
  totalCount: number;
}

