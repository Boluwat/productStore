/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import logger from "../utils/logger";
import { formatResponse } from "../utils/response-format";
import {
  createProductService,
  getAllProductsService,
  getProductsService,
  updateProductService,
  deleteProductsService,
} from "../services/product-service/product.service";
import { PaginationQueryInput } from "../schemas/paginations";
import { verify } from "../utils/tokenizer";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const validationResponse = verify(authorizationHeader);

    if (!validationResponse.isSuccess) {
      return res.status(400).json(validationResponse);
    }

    const response = await createProductService(req.body);

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .json(formatResponse({ message: "You just hit a break wall" }));
  }
};

export const getAllProductController = async (
  req: Request<{}, {}, {}, PaginationQueryInput>,
  res: Response
) => {
  try {
    const { limit, page } = req.query;
    const limitNum = limit || 50;
    const pageNum = page || 1;
    const skip: number = limitNum * (pageNum - 1);

    const response = await getAllProductsService({ limit, skip });
    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    logger.error(error);
    res
      .status(400)
      .json(formatResponse({ message: "You just hit a break wall" }));
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const validationResponse = verify(authorizationHeader);

    if (!validationResponse.isSuccess) {
      return res.status(400).json(validationResponse);
    }

    const response = await updateProductService(req.body, req.query);

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .json(formatResponse({ message: "You just hit a break wall" }));
  }
};

export const deleteProductController = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const validationResponse = verify(authorizationHeader);

    if (!validationResponse.isSuccess) {
      return res.status(400).json(validationResponse);
    }

    const response = await deleteProductsService({ id: req.params.id });

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .json(formatResponse({ message: "You just hit a break wall" }));
  }
};

export const getProductController = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const validationResponse = verify(authorizationHeader);

    if (!validationResponse.isSuccess) {
      return res.status(400).json(validationResponse);
    }

    const response = await getProductsService({ id: req.params.id });

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .json(formatResponse({ message: "You just hit a break wall" }));
  }
};
