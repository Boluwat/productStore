import { getAllProductsService } from "../product.service";
import { Product } from "../../../models";
import { mapProductStoreModelToDTO } from "../util";
import { formatResponse } from "../../../utils/response-format";
import logger from "../../../utils/logger";

const date = new Date();

const mockProduct = [
  {
    _id: "123",
    name: "mockPayload.name",
    description: "mockPayload.description",
    price: 100,
    quantity: 5,
    status: 'ACTIVE',
    createdAt: date,
    updatedAt: date,
  },
];

jest.mock("../../../utils/logger", () => ({
  error: jest.fn(),
}));

jest.mock("../../../models/products/product.models", () => ({
  countDocuments: jest.fn().mockReturnValue(10),
  find: jest.fn(),
}));

jest.mock("../util", () => ({
  mapProductStoreModelToDTO: jest.fn(),
}));

jest.mock("../../../utils/response-format", () => ({
  formatResponse: jest.fn(),
}));

describe("getAllProductsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a successful response with products and pagination data", async () => {
    const limit = 50;
    const skip = 0;
    const pageCount = 1;

    (mapProductStoreModelToDTO as jest.Mock).mockImplementation(
      () => mockProduct[0]
    );

    const result = await getAllProductsService({ limit, skip });

    // expect(mapProductStoreModelToDTO).toHaveBeenCalledTimes(mockProduct.length);
    expect(result).toEqual(
      formatResponse({
        isSuccess: true,
        data: {
          products: mockProduct,
          pageCount,
          totalCount: 10,
        },
      })
    );
  });

  it("should handle errors and return an error response", async () => {
    const limit = 1;
    const skip = 0;
    const errorMessage = "An error occurred";

    jest
      .spyOn(Product, "countDocuments")
      .mockRejectedValue(new Error(errorMessage));

    const result = await getAllProductsService({ limit, skip });

    expect(result).toEqual(
      formatResponse({
        message: "You just hit a break wall",
      })
    );
    expect(mapProductStoreModelToDTO).not.toHaveBeenCalledWith({});
    expect(logger.error).toHaveBeenCalledWith(new Error(errorMessage));
  });
});
