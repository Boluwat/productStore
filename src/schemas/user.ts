import { TypeOf, object, string } from "zod";

export const loginPayloadSchema = object({
  email: string({
    required_error: "Email is required.",
  }).email(),
  password: string({
    required_error: "Password is required.",
  }),
});
export const createPayloadSchema = object({
    email: string({
        required_error: "Email is required.",
      }).email(),
      password: string({
        required_error: "Password is required.",
      }),
      firstname: string({
        required_error: "Firstname is required.",
      }),
      lastname: string({
        required_error: "Lastname is required.",
      }),
      mobile: string({
        required_error: "Phone number is required.",
      }),
});




export type SignUpInput = TypeOf<typeof createPayloadSchema>;
export type LoginUserInput = TypeOf<typeof loginPayloadSchema>;
