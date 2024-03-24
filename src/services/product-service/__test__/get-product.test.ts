import { getProductsService } from "../product.service";
import { Product } from "../../../models";
import { mapProductStoreModelToDTO } from "../util";
import { formatResponse } from "../../../utils/response-format";
// import logger from "../../../utils/logger";

const date = new Date();

const mockProduct = {
  id: "123",
  name: "mockPayload.name",
  description: "mockPayload.description",
  price: 100,
  quantity: 5,
  status: "ACTIVE",
  createdAt: date,
  updatedAt: date,
};

jest.mock("../../../utils/logger", () => ({
  error: jest.fn(),
}));

jest.mock("../../../models/products/product.models", () => ({
  findOne: jest.fn(),
}));

jest.mock("../util", () => ({
  mapProductStoreModelToDTO: jest.fn(),
}));

jest.mock("../../../utils/response-format", () => ({
  formatResponse: jest.fn(),
}));

describe("getProductsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a successful response if products is found", async () => {
    (mapProductStoreModelToDTO as jest.Mock).mockImplementation(
      () => mockProduct
    );
    const result = await getProductsService({ id: "123" });

    expect(Product.findOne).toHaveBeenCalledWith({ _id: "123" });
    expect(result).toEqual(
      formatResponse({
        isSuccess: true,
        data: {
          products: mockProduct,
        },
      })
    );
  });

  it("should return an error response if product is not found", async () => {
    (Product.findOne as jest.Mock).mockResolvedValue(null);
    (formatResponse as jest.Mock).mockReturnValue({
      isSuccess: false,
      message: "Product records not found",
    });

    const result = await getProductsService({ id: "123" });

    expect(Product.findOne).toHaveBeenCalledWith({ _id: "123" });
    expect(result).toEqual(
      formatResponse({
        isSuccess: false,
        message: "Product records not found",
      })
    );
    expect(mapProductStoreModelToDTO).not.toHaveBeenCalled();
    expect(result).toEqual({
      isSuccess: false,
      message: "Product records not found",
    });
  });

  it("should return an error response when an error occurs", async () => {

    const ErrorMessage = "Error occured";

    (Product.findOne as jest.Mock).mockResolvedValue(new Error(ErrorMessage));
    (formatResponse as jest.Mock).mockReturnValue({
      isSuccess: false,
      message: "You just hit a break wall",
    });

    const result = await getProductsService({id: "123"});

    expect(Product.findOne).toHaveBeenCalledWith({ _id: "123" });
    expect(mapProductStoreModelToDTO).toHaveBeenCalled();
    expect(result).toEqual({
      isSuccess: false,
      message: "You just hit a break wall",
    });
  });
});
