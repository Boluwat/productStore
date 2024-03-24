import { createProductService } from "../product.service";
import { Product } from "../../../models";
import { mapProductStoreModelToDTO } from "../util";
import { ICreateProductDTO } from "../../../interfaces";
import { formatResponse } from "../../../utils/response-format";

const mockPayload: ICreateProductDTO = {
  name: "name",
  description: "user",
  price: 10,
  quantity: 5,
};
const date = new Date();

const mockProduct = {
  _id: "123",
  name: mockPayload.name,
  description: mockPayload.description,
  price: mockPayload.price,
  quantity: mockPayload.quantity,
  createdAt: date,
  updatedAt: date,
};

jest.mock("../../../models/products/product.models", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
}));

jest.mock("../util", () => ({
  mapProductStoreModelToDTO: jest.fn(),
}));

jest.mock("../../../utils/response-format", () => ({
  formatResponse: jest.fn(),
}));

describe("create-product", () => {
  // Restore mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });


  it("should create a new product and return success response", async () => {

    (Product.findOne as jest.Mock).mockResolvedValue(null);
    (Product.create as jest.Mock).mockResolvedValue(mockProduct);
    (mapProductStoreModelToDTO as jest.Mock).mockImplementation(
      () => mockPayload
    );
    (formatResponse as jest.Mock).mockReturnValue({ isSuccess: true });

    const result = await createProductService(mockPayload);

    expect(Product.findOne).toHaveBeenCalledWith({ name: mockPayload.name });

    expect(Product.create).toHaveBeenCalled();
    expect(mapProductStoreModelToDTO).toHaveBeenCalled();
    expect(result.isSuccess).toEqual(true);
  });

  it("should return an error response when the product already exists", async () => {

    (Product.findOne as jest.Mock).mockResolvedValue(mockProduct);

    (mapProductStoreModelToDTO as jest.Mock).mockImplementation(() => {});
    (formatResponse as jest.Mock).mockReturnValue({
      isSuccess: false,
      message: "Product records exist",
    });

    const result = await createProductService(mockPayload);

    expect(Product.findOne).toHaveBeenCalledWith({ name: mockPayload.name });
    expect(Product.create).not.toHaveBeenCalled();
    expect(mapProductStoreModelToDTO).not.toHaveBeenCalled();
    expect(result).toEqual({
      isSuccess: false,
      message: "Product records exist",
    });
  });

  it("should return an error response when an error occurs", async () => {

    const ErrorMessage = "Error occured";

    (Product.findOne as jest.Mock).mockResolvedValue(new Error(ErrorMessage));
    (formatResponse as jest.Mock).mockReturnValue({
      isSuccess: false,
      message: "You just hit a break wall",
    });

    const result = await createProductService(mockPayload);

    expect(Product.findOne).toHaveBeenCalledWith({ name: mockPayload.name });
    expect(mapProductStoreModelToDTO).not.toHaveBeenCalled();
    expect(result).toEqual({
      isSuccess: false,
      message: "You just hit a break wall",
    });
  });
});
