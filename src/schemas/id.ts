import { z, TypeOf, string } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const idQuerySchema = z.object({
  id: string({
    required_error: "id is required.",
  }).refine((value) => objectIdRegex.test(value), {
    message: "id must be a valid id (24 characters)",
  }),
});

export type IDQueryInput = TypeOf<typeof idQuerySchema>;
