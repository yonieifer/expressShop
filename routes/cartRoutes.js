import express from "express";
import { findCustomerById } from "../repo/customersRepo";

const router = express.Router();

router.get("/cart", async (req, res) => {
    const customerId = req.query.customerId;
    const customer = await findCustomerById(customerId);

    if (!customer) {
        return res
            .status(400)
            .send({ success: false, message: `Customer ${customerId} not exists`});
    }
    res.send({
        success: true,
        data: customer.cart,
    });
});
