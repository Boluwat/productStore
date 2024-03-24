import logger from "../../utils/logger";
import { User } from "../../models";
import {
  ICreateUserDTO,
  IServiceResponseDTO,
  IUserDTO,
  IUserLoginDTO,
  IUserLoginSuccessResponseDTO
} from "../../interfaces";
import { formatResponse } from "../../utils/response-format";
import { hashManager } from "../../utils/hash-manager";
import { mapUserStoreModelToDTO } from "./util";
import { generateLoginResponse } from "./login-util.service";

export const createUser = async (
  payload: ICreateUserDTO
): Promise<IServiceResponseDTO<IUserDTO | undefined>> => {
  try {
    const { email, password } = payload;
    const user = await User.findOne({ email });

    if (user) {
      return formatResponse({
        isSuccess: false,
        message: "User does not exist",
      });
    }

    payload.password = await hashManager().hash(password);

    const newUser = await User.create(payload);
    return formatResponse({
      isSuccess: true,
      data: mapUserStoreModelToDTO(newUser),
      message: "User register succesfully",
    });
  } catch (err) {
    logger.error(err);
    return formatResponse({
      isSuccess: false,
      message: "You just hit a break wall",
    });
  }
};

export const loginUser = async (
    payload: IUserLoginDTO
): Promise<IServiceResponseDTO<IUserLoginSuccessResponseDTO | undefined>> => {
    try {
        const {email, password} = payload;
        const user = await User.findOne({email});

        if (user) {
            const validate = await hashManager().compare(
                password,
                user.password
            );

            if (validate) {
                const data: IUserLoginSuccessResponseDTO = generateLoginResponse(mapUserStoreModelToDTO(user))
                return formatResponse({
                    isSuccess: true,
                    data
                })
            }
        }
        return formatResponse({
            isSuccess: false,
            message: 'Email or Password is Invalid'
        });
    } catch (err) {
        logger.error(err);
        return formatResponse({
            isSuccess: false,
            message: 'You just hit a break wall'
        })
    }
}
