import { loginUser } from '../user.service'
import { User } from '../../../models';
import { hashManager } from '../../../utils/hash-manager';
import { formatResponse } from "../../../utils/response-format";
import logger from '../../../utils/logger';
import { IUserLoginDTO } from '../../../interfaces';
import { generateLoginResponse } from '../login-util.service';
import { mapUserStoreModelToDTO } from '../util';

jest.mock('../../../models/users/user.models', () => ({
  findOne: jest.fn(),
}));

jest.mock('../login-util.service', () => ({
  generateLoginResponse: jest.fn(),
}));

jest.mock('../util', () => ({
  mapUserStoreModelToDTO: jest.fn(),
}));

const mockHashManager = {
  compare: jest.fn(),
}

jest.mock('../../../utils/hash-manager', () => ({
  hashManager: () => mockHashManager,
}));

jest.mock('../../../utils/response-format', () => ({
  formatResponse: jest.fn(),
}));

describe('loginService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  });
  it('should return a success response when valid credentials are provided', async () => {
    const mockPayload: IUserLoginDTO = {
      email: 'test@example.com',
      password: 'password',
    };
    const mockUser = {
      email: 'test@example.com',
      password: 'hashedPassword',
    };

    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    (hashManager().compare as jest.Mock).mockResolvedValue(true);

    (generateLoginResponse as jest.Mock).mockImplementation(() => {});
    (mapUserStoreModelToDTO as jest.Mock).mockImplementation(() => { });

    (formatResponse as jest.Mock).mockReturnValue({ isSuccess: true });

    const result = await loginUser(mockPayload);

    expect(result.isSuccess).toBe(true);
    expect(User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
    expect(hashManager().compare).toHaveBeenCalledWith(
      mockPayload.password,
      mockUser.password
    );
    expect(generateLoginResponse).toHaveBeenCalled();
    expect(mapUserStoreModelToDTO).toHaveBeenCalled();
    expect(formatResponse).toHaveBeenCalledTimes(1);
  });

  it('should return an error response when invalid credentials are provided', async () => {
    const mockPayload: IUserLoginDTO = {
      email: 'test@example.com',
      password: 'password',
    };

    (User.findOne as jest.Mock).mockResolvedValue(null);

    (formatResponse as jest.Mock).mockReturnValue({ isSuccess: false,  message: 'Email or Password is Invalid', });

    const result = await loginUser(mockPayload);

    expect(result.isSuccess).toBe(false);
    expect(User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
    expect(hashManager().compare).not.toHaveBeenCalled();
    expect(formatResponse).toHaveBeenCalledWith({
      isSuccess: false,
      message: 'Email or Password is Invalid',
    });
    expect(generateLoginResponse).not.toHaveBeenCalled();
  });

  it('should return an error response when an exception occurs', async () => {
    const mockPayload: IUserLoginDTO = {
      email: 'test@example.com',
      password: 'password',
    };

    (User.findOne as jest.Mock).mockRejectedValue(new Error('Test error'));


    (formatResponse as jest.Mock).mockReturnValue({ isSuccess: false,  message: 'You just hit a break wall' });

    logger.error = jest.fn();

    const result = await loginUser(mockPayload);

    expect(result.isSuccess).toBe(false);
    expect(User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
    expect(hashManager().compare).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith(expect.any(Error));
    expect(formatResponse).toHaveBeenCalledWith({
      isSuccess: false,
      message: 'You just hit a break wall',
    });
    expect(generateLoginResponse).not.toHaveBeenCalled();
  });
});
