import { updateProductService } from "../product.service";
import { Product } from "../../../models";
import { mapProductStoreModelToDTO } from "../util";
// import { IUpdateProductDTO } from "../../../interfaces";
import { formatResponse } from "../../../utils/response-format";

const mockPayload = {
  name: "name",
};

const mockQuery = {
    id: "123"
}


const mockProduct = {
  _id: "123",
  name: mockPayload.name,
  description: 'mockPayload.description',
  price: 'mockPayload.price',
  quantity: 'mockPayload.quantity',
};

const updateProduct = {...mockQuery, ...mockPayload}

jest.mock("../../../models/products/product.models", () => ({
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

jest.mock("../util", () => ({
  mapProductStoreModelToDTO: jest.fn(),
}));

jest.mock("../../../utils/response-format", () => ({
  formatResponse: jest.fn(),
}));

describe("update-product", () => {
  // Restore mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });


  it("should update product and return success response", async () => {

    (Product.findOne as jest.Mock).mockResolvedValue(mockProduct);
    (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(updateProduct);
    (mapProductStoreModelToDTO as jest.Mock).mockReturnValue(mockProduct);
    (formatResponse as jest.Mock).mockReturnValue({ isSuccess: true });


    const result = await updateProductService(mockPayload, mockQuery);


    expect(Product.findOne).toHaveBeenCalledWith({_id: "123"});


    expect(result.isSuccess).toEqual(true);
  });

  it('should return error response if product is not found', async () => {
    
    (Product.findOne as jest.Mock).mockResolvedValueOnce(null);


    const result = await updateProductService(mockPayload, mockQuery);

    expect(result).toEqual(
      formatResponse({
        isSuccess: false,
        message: 'Product records not found',
      })
    );
  });

  it('should return error response when encountering an error', async () => {
    (Product.findOne as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    const result = await updateProductService(mockPayload, mockQuery);

    expect(result).toEqual(
      formatResponse({
        isSuccess: false,
        message: 'You just hit a break wall',
      })
    );
  });
});
