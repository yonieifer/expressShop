import express from "express";
import { getAllProducts, getFilteredProducts } from "../repository/productsRepo.js";
import { findCustomerById } from "../repository/customersRepo.js";
import { loadCustomer} from "../middlewares/loadCustomer.js"

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

router.get("/account/balance", loadUser,  async (req, res) => {
    res.send({
        success: true,
        data: req.customer.balance,
    });
});

export default router;

