import { IUserDTO } from "../../interfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapUserStoreModelToDTO = (user: any): IUserDTO => ({
    id: user._id.toString(),
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    mobile: user.mobile,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
  });