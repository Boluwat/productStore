import swaggerJSDoc from "swagger-jsdoc";
import * as dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for your Application",
    },
    servers: [
      {
        url: process.env.SERVER_URL,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(options);
