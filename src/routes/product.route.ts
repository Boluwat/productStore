import { Router } from "express";
import { paginationQuerySchema } from "../schemas/paginations";
import { validateBodyParams, validatePathParams, validateQueryAndBody, validateQueryParams } from "../middlewares/validate-.middleware";
import { productSchema, getProductSchema, updateProductSchema } from "../schemas/products";
import { createProductController, getAllProductController, getProductController, deleteProductController, updateProductController } from "../controllers/product.controller";


const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Operations related to products
 * /api/products/product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create a Product
 *     description: Create a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: true
 *               data:
 *                 name: 'sam'
 *                 description: 'anj'
 *                 type: 'type'
 *                 quantity: 6
 *                 price: 100
 *                 createdAt: '2023-09-10T21:14:56.994Z'
 *                 updatedAt: '2023-09-10T21:14:56.994Z'
 *                 status: 'Active'
 *               message: 'Product created successfully.'
 *       default:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: false
 *               message: 'An error occurred.'
 */


router.post(
  "/products/product",
  validateBodyParams(productSchema),
  createProductController
);


/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Operations related to products
 * /api/products:
 *   patch:
 *     tags:
 *       - Product
 *     summary: Update a Product
 *     description: Update a Product
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name: 
 *                  type: string
 *                description: 
 *                  type: string
 *                quantity: 
 *                  type: number
 *                price: 
 *                  type: number
 *     responses:
 *       '200':
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: true
 *               data:
 *                 name: 'sam'
 *                 description: 'anj'
 *                 status: 'ACTIVE'
 *                 quantity: 6
 *                 price: 100
 *                 id: '64fe31d0aa7c0deceb6b9e63'
 *                 createdAt: '2023-09-10T21:14:56.994Z'
 *                 updatedAt: '2023-09-10T21:14:56.994Z'
 *               message: 'Product updated successfully.'
 *       default:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: false
 *               message: 'An error occurred.'
 */

router.patch(
  "/products",
  validateQueryAndBody({
    body: updateProductSchema,
    query: getProductSchema,
  }),
  updateProductController
);

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Operations related to products
 * /api/products/:id:
 *   patch:
 *     tags:
 *       - Product
 *     summary: Delete a Product
 *     description: Delete a Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: true
 *               data:
 *                 name: 'sam'
 *                 description: 'anj'
 *                 status: 'INACTIVE'
 *                 quantity: 6
 *                 price: 100
 *                 id: '64fe31d0aa7c0deceb6b9e63'
 *                 createdAt: '2023-09-10T21:14:56.994Z'
 *                 updatedAt: '2023-09-10T21:14:56.994Z'
 *               message: 'Product deleted successfully.'
 *       default:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: false
 *               message: 'An error occurred.'
 */

router.patch(
    "/products/:id",
    validatePathParams(getProductSchema),
    deleteProductController
  );


/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Operations related to products
 * /api/products/products:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get a list of All Products
 *     description: Retrieve a list of All Products.
 *     responses:
 *       '200':
 *         description: A list of All Products.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: true
 *               data:
 *                 products:
 *                   - id: '64fb9ded82eb3a0345be0c7b'
 *                     description: 'sam'
 *                     status: 'ACTIVE'
 *                     price: 600
 *                     quantity: 10
 *                     name: 'tife'
 *                     createdAt: '2023-09-10T21:14:56.994Z'
 *                     updatedAt: '2023-09-10T21:14:56.994Z'
 *                 pageCount: 12
 *                 totalCount: 12
 *               message: ''
 *       default:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: false
 *               message: 'An error occurred.'
 */
router.get(
  "/products/product",
  validateQueryParams(paginationQuerySchema),
  getAllProductController

);

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Operations related to products
 * /api/products/:id:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get a Product
 *     description: Retrieve a Product.
 *     responses:
 *       '200':
 *         description: Retrieve a Product.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: true
 *               data:
 *                 products:
 *                   - name: 'sam'
 *                     description: 'anj'
 *                     type: 'type'
 *                     quantity: 6
 *                     price: 100
 *                     status: 'ACTIVE'
 *               message: ''
 *       default:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: false
 *               message: 'An error occurred.'
 */

router.get(
  "/products/:id",
  validatePathParams(getProductSchema),
  getProductController
);



export default router;
