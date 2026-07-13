import express from "express";
import { loadJson, writeJson } from "../repository/jsonRepo.js";
import loadCustomer from "../middlewares/loadCustomer.js";
import { productAvailable, checkout } from "../repository/ordersRepo.js";
import { getProductById } from "../repository/productsRepo.js";

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

router.post("/checkout", loadCustomer, async (req, res) => {
    const customer = req.customer;

    if (customer.cart.length === 0) {
        res.status(400).send({
            success: false,
            message: "empty cart",
        });
        return;
    }
    let totalPrice = 0;
    for(const p of customer.cart){
        const isAvailable = await productAvailable(p.productId, p.quantity)
        if (!isAvailable) {
            return res.status(400).send({
                success: false,
                message: `product ${p.productId} not available`,
            });
        }
        const product = await getProductById(p.productId)
        totalPrice += product.price * p.quantity
    }

    if (customer.balance < totalPrice) {
        res.status(400).send({
            success: false,
            message: "to expensive",
        });
    }
    const newId = await checkout(customer, totalPrice);
    res.send({
        success: true,
        message: `order id: ${newId}| total price: ${totalPrice}`,
    });
});

export default router