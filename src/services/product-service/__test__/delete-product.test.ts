import { deleteProductsService } from "../product.service";
import { Product } from "../../../models";
import { mapProductStoreModelToDTO } from "../util";
// import { IUpdateProductDTO } from "../../../interfaces";
import { formatResponse } from "../../../utils/response-format";
import logger from "../../../utils/logger";

const mockPayload = {
  name: "name",
};

const mockQuery = {
  id: "123",
};

const mockProduct = {
  _id: "123",
  name: mockPayload.name,
  description: "mockPayload.description",
  price: "mockPayload.price",
  quantity: "mockPayload.quantity",
  status: "ACTIVE",
};

jest.mock("../../../utils/logger", () => ({
  error: jest.fn(),
}));

jest.mock("../../../models/products/product.models", () => ({
  findOneAndUpdate: jest.fn(),
}));

jest.mock("../util", () => ({
  mapProductStoreModelToDTO: jest.fn(),
}));

jest.mock("../../../utils/response-format", () => ({
  formatResponse: jest.fn(),
}));

describe("delete-product", () => {
  // Restore mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete product and return success response", async () => {
    // Mock the necessary functions

    (Product.findOneAndUpdate as jest.Mock).mockResolvedValue(mockProduct);
    (mapProductStoreModelToDTO as jest.Mock).mockReturnValue(mockProduct);
    (formatResponse as jest.Mock).mockReturnValue({ isSuccess: true });

    const result = await deleteProductsService({ id: mockQuery.id });

    expect(Product.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockQuery.id },
      { status: "INACTIVE" },
      { new: true }
    );

    expect(mapProductStoreModelToDTO).toHaveBeenCalledWith(mockProduct);

    expect(result.isSuccess).toEqual(true);
  });

  it("should return error response when product not found", async () => {
    (Product.findOneAndUpdate as jest.Mock).mockResolvedValue(null);
    (formatResponse as jest.Mock).mockReturnValue({ isSuccess: false });

    const result = await deleteProductsService({ id: mockQuery.id });

    expect(result.isSuccess).toEqual(false);
  });

  it("should return error response when an error occurs", async () => {
    const mockError = new Error("Test error");
    (Product.findOneAndUpdate as jest.Mock).mockRejectedValue(mockError);
    (logger.error as jest.Mock).mockReturnValue(undefined);
    (formatResponse as jest.Mock).mockReturnValue({ isSuccess: false });

    const result = await deleteProductsService({ id: mockQuery.id });

 
    expect(result.isSuccess).toEqual(false);

   
    expect(logger.error).toHaveBeenCalledWith(mockError);
  });
});
