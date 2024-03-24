import { object, string, number } from "zod";

export const productSchema = object({
  name: string({
    required_error: "Name is required.",
  }),
  description: string({
    required_error: "Description is required.",
  }),
  quantity: number({
    required_error: "Quantity is required.",
  }),
  price: number({
    required_error: "Price is required.",
  }),
});

export const getProductSchema = object({
  id: string({
    required_error: "Id is required.",
  }),
});

export const updateProductSchema = object({
  name: string().optional(),
  description: string().optional(),
  quantity: number().optional(),
  price: number().optional(),
});
