import express from "express";

import { createorder, getAllOrders, newPayment, sendPaystackPublishableKey } from "../controllers/order.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createorder);

orderRouter.get("/get-orders", updateAccessToken, isAuthenticated, authorizeRoles("admin"), getAllOrders);

orderRouter.get("/payment/paystackpublishablekey", sendPaystackPublishableKey);

orderRouter.post("/payment", isAuthenticated, newPayment)

export default orderRouter; 