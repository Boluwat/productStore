import { Express } from "express";
import { userRoute } from ".";
import { productRoute } from ".";

export default (app: Express) => {
  app.use("/api", userRoute);
  app.use("/api", productRoute);
};
