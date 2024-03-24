import { Router } from "express";
import { validateBodyParams } from "../middlewares/validate-.middleware";
import { loginPayloadSchema, createPayloadSchema } from "../schemas/user";
import { loginController, signUpController } from "../controllers";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to users
 * /api/users/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login
 *     description: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: true
 *               data: ''
 *               message: 'Request Processed Successfully'
 *       default:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: false
 *               message: 'An error occurred.'
 */


router.post(
  "/users/login",
  validateBodyParams(loginPayloadSchema, false),
  loginController
);

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to users
 * /api/users/sign-up:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign Up
 *     description: Sign Up
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Sign up Successful.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: true
 *               data: ''
 *               message: 'Request Processed Successfully'
 *       default:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: false
 *               message: 'An error occurred.'
 */


router.post(
  "/users/sign-up",
  validateBodyParams(createPayloadSchema, false),
  signUpController
);

export default router;
