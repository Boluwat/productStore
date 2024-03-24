import logger from "../../utils/logger";
import { Product } from "../../models";
import {
  ICreateProductDTO,
  IServiceResponseDTO,
  IProductDTO,
  IUpdateProductDTO,
  IGetProductsResponseDTO,
} from "../../interfaces";
import { formatResponse } from "../../utils/response-format";
import { mapProductStoreModelToDTO } from "./util";
import { QueryOptions } from "mongoose";

export const createProductService = async (
  payload: ICreateProductDTO
): Promise<IServiceResponseDTO<IProductDTO | undefined>> => {
  try {
    const product = await Product.findOne({ name: payload.name });

    if (product) {
      return formatResponse({
        isSuccess: false,
        message: "Product records exist",
      });
    }
    const newProduct = await Product.create(payload);

    return formatResponse({
      isSuccess: true,
      data: mapProductStoreModelToDTO(newProduct),
      message: "Product created succesfully",
    });
  } catch (err) {
    logger.error(err);
    return formatResponse({
      isSuccess: false,
      message: "You just hit a break wall",
    });
  }
};

export const updateProductService = async (
  payload: IUpdateProductDTO,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any
): Promise<IServiceResponseDTO<IProductDTO | undefined>> => {
  try {
    const product = await Product.findOne({ _id: query.id });

    if (!product) {
      return formatResponse({
        isSuccess: false,
        message: "Product records not found",
      });
    }

    const value = await Product.findByIdAndUpdate(query.id, payload, {
      new: true,
    });

    return formatResponse({
      isSuccess: true,
      data: mapProductStoreModelToDTO(value),
      message: "Product updated successfully",
    });
  } catch (err) {
    logger.error(err);
    return formatResponse({
      isSuccess: false,
      message: "You just hit a break wall",
    });
  }
};

export const getAllProductsService = async ({
  limit=50,
  skip = 0,
}: {
  limit: number;
  skip: number;
}): Promise<IServiceResponseDTO<IGetProductsResponseDTO | undefined>> => {
  try {
    interface Query {
      status: { $ne: string };
    }

    const query: Query = { status: { $ne: "INACTIVE" } };

    const options: QueryOptions = { skip, limit, sort: { name: -1 } };
    const totalCount = await Product.countDocuments(query);
    const products = await Product.find(query, {}, options);
    const pageCount = Math.ceil(totalCount / limit);

    return formatResponse({
      isSuccess: true,
      data: {
        products: products.map((product) => mapProductStoreModelToDTO(product.toObject())),
        pageCount,
        totalCount,
      },
    });
  } catch (error) {
    logger.error(error);
    return formatResponse({
      message: "You just hit a break wall",
    });
  }
};

export const getProductsService = async ({
  id,
}: {
  id: string;
}): Promise<IServiceResponseDTO<IProductDTO | undefined>> => {
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return formatResponse({
        isSuccess: false,
        message: "Product records not found",
      });
    }
    return formatResponse({
      isSuccess: true,
      data: mapProductStoreModelToDTO(product),
    });
  } catch (err) {
    logger.error(err);
    return formatResponse({
      isSuccess: false,
      message: "You just hit a break wall",
    });
  }
};

export const deleteProductsService = async ({
  id,
}: {
  id: string;
}): Promise<IServiceResponseDTO<IProductDTO | undefined>> => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        _id: id,
      },
      {
        status: "INACTIVE",
      },
      {
        new: true,
      }
    );
    if (!product) {
      return formatResponse({
        isSuccess: false,
        message: "Product records not found",
      });
    }
    return formatResponse({
      isSuccess: true,
      data: mapProductStoreModelToDTO(product),
    });
  } catch (err) {
    logger.error(err);
    return formatResponse({
      isSuccess: false,
      message: "You just hit a break wall",
    });
  }
};
