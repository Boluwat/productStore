import { createUser } from "../user.service";
import { User } from "../../../models";
import { hashManager } from "../../../utils/hash-manager";
import { mapUserStoreModelToDTO } from "../util";

import { ICreateUserDTO } from "../../../interfaces";
import logger from "../../../utils/logger";
import { formatResponse } from "../../../utils/response-format";

const mockHashManager = {
  hash: jest.fn(),
};

jest.mock("../../../models/users/user.models", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
}));

jest.mock("../../../utils/hash-manager", () => ({
  hashManager: () => mockHashManager,
}));
jest.mock("../util", () => ({
  mapUserStoreModelToDTO: jest.fn(),
}));

jest.mock("../../../utils/response-format", () => ({
  formatResponse: jest.fn(),
}));

describe("create-user", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const date = new Date().toString();
  it("should create a new user and return success response", async () => {
    const mockPayload: ICreateUserDTO = {
      email: "test@test.com",
      password: "password",
      firstname: "test",
      lastname: "test",
      mobile: "phone",
    };

    const mockUser = {
      _id: "123",
      email: mockPayload.email,
      firstname: mockPayload.firstname,
      lastname: mockPayload.lastname,
      mobile: mockPayload.mobile,
      password: "password",
      createdAt: date,
      updatedAt: date,
    };

    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue(mockUser);
    (hashManager().hash as jest.Mock).mockResolvedValue(mockUser.password);

    (mapUserStoreModelToDTO as jest.Mock).mockImplementation(() => mockPayload);
    (formatResponse as jest.Mock).mockReturnValue({ isSuccess: true });

    const result = await createUser(mockPayload);

    expect(User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
    expect(hashManager().hash).toHaveBeenCalledWith("password");
    expect(User.create).toHaveBeenCalled();
    expect(mapUserStoreModelToDTO).toHaveBeenCalled();
    expect(result.isSuccess).toEqual(true);
  });

  it("should return an error response when the user already exists", async () => {
    const mockPayload: ICreateUserDTO = {
      email: "test@test.com",
      password: "password",
      firstname: "test",
      lastname: "test",
      mobile: "phone",
    };

    const mockUser = {
      _id: "123",
      email: mockPayload.email,
      firstname: mockPayload.firstname,
      lastname: mockPayload.lastname,
      mobile: mockPayload.mobile,
      password: "password",
      createdAt: date,
      updatedAt: date,
    };

    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    (User.create as jest.Mock).mockResolvedValue(mockUser);

    (mapUserStoreModelToDTO as jest.Mock).mockImplementation(() => {});
    (formatResponse as jest.Mock).mockReturnValue({
      isSuccess: false,
      message: "User constants.errorMessage.exist",
    });

    const result = await createUser(mockPayload);

    expect(User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
    expect(mapUserStoreModelToDTO).not.toHaveBeenCalled();
    expect(hashManager().hash).not.toHaveBeenCalled();
    expect(result).toEqual({
      isSuccess: false,
      message: "User constants.errorMessage.exist",
    });
  });

  it("should return an error response when an error occurs", async () => {
    const mockPayload: ICreateUserDTO = {
      email: "test@test.com",
      password: "password",
      firstname: "test",
      lastname: "test",
      mobile: "phone",
    };

    const ErrorMessage = "Error occured";

    (User.findOne as jest.Mock).mockResolvedValue(new Error(ErrorMessage));
    (formatResponse as jest.Mock).mockReturnValue({
      isSuccess: false,
      message: "User constants.errorMessage.exist",
    });

    const result = await createUser(mockPayload);

    expect(User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
    expect(mapUserStoreModelToDTO).not.toHaveBeenCalled();
    expect(hashManager().hash).not.toHaveBeenCalled();
    expect(result).toEqual({
      isSuccess: false,
      message: "User constants.errorMessage.exist",
    });
  });
  it("should return an error response when an exception occurs", async () => {
    const mockPayload: ICreateUserDTO = {
      email: "test@test.com",
      password: "password",
      firstname: "test",
      lastname: "test",
      mobile: "phone",
    };
    (User.findOne as jest.Mock).mockRejectedValue(new Error("Test error"));
    (User.create as jest.Mock).mockRejectedValue(new Error("Test error"));

    logger.error = jest.fn();

    const result = await createUser(mockPayload);

    expect(result.isSuccess).toBe(false);
    expect(logger.error).toHaveBeenCalledWith(expect.any(Error));
  });
});
