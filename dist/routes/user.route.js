"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate__middleware_1 = require("../middlewares/validate-.middleware");
const user_1 = require("../schemas/user");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
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
router.post("/users/login", (0, validate__middleware_1.validateBodyParams)(user_1.loginPayloadSchema, false), controllers_1.loginController);
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
router.post("/users/sign-up", (0, validate__middleware_1.validateBodyParams)(user_1.createPayloadSchema, false), controllers_1.signUpController);
exports.default = router;
//# sourceMappingURL=user.route.js.map