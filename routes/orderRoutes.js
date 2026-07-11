import express from "express";
import { loadJson, writeJson } from "../repository/jsonRepo.js";
import loadCustomer from "../middlewares/loadCustomer.js";
import { productAvailable } from "../repository/ordersRepo.js";

const router = express.Router();

router.get("/", loadCustomer, async (req, res) => {
    try {
        const allOrders = await loadJson("/orders.json");
        const customerOrders = allOrders.filter(
            (o) => o.customerId === req.query.customerId,
        );

        res.send({
            success: true,
            data: customerOrders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "server internal error",
        });
    }
});

router.post("/checkout", loadCustomer, (req, res) => {
    const customer = req.customer;
    if (customer.cart.length === 0) {
        res.status(400).send({
            success: false,
            message: "empty cart",
        });
        return;
    }
    customer.cart.forEach((p) => {
        if (!productAvailable(p.productId, p.quantity)) {
            res.status(400).send({
                success: false,
                message: `product ${p.productId} not available`,
            });
            return;
        }
    });
});
