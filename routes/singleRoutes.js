import express from "express";
import { getAllProducts, getFilteredProducts } from "../repository/productsRepo.js";
import { findCustomerById } from "../repository/customersRepo.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        success: true,
        data: "Welcome to the Online Store API",
    });
});

router.get("/health", (req, res) => {
    res.send({
        success: true,
        data: "PONG",
    });
});

router.get("/products", async (req, res) => {
    res.send({
        success: true,
        data: await getFilteredProducts(req.query)
    });
});

router.get("/account/balance", async (req, res) => {
    const customerId = req.query.customerId;
    const customer = await findCustomerById(customerId);

    if (!customer) {
        return res
            .status(400)
            .send({ success: false, message: "Customer not exists" });
    }
    res.send({
        success: true,
        data: customer.balance,
    });
});

export default router;

