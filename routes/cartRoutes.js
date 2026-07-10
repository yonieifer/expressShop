import express from "express";
import loadCustomer from "../middlewares/loadCustomer.js";
import { getProductById } from "../repository/productsRepo.js";
import { writeJson } from "../repository/jsonRepo.js";

const router = express.Router();

router.get("/", loadCustomer, (req, res) => {
    try {
        res.send({
            success: true,
            data: req.customer.cart
        });
    } catch (error) {
        console.log(error);
    }
});

router.post("/items", loadCustomer, async (req, res) => {
    const {productId, quantity} = req.body
    const product = await getProductById(productId)

    if (!product) {
        return res.status(404).send({
            success: false,
            message: "product not found"
        })
    }

    if (quantity <= 0 || quantity > product.stock) {
        return res.status(400).send({
            success: false,
            message: "Invalid quantity"
        })
    }

    req.customer.cart.push({productId, quantity})
    await writeJson("/customers.json", req.allCustomers)

    res.status(201).send({
        success: true,
        data: "created"
    })
})

router.delete("/items/:product", loadCustomer, async (req, res) => {
    const productId = req.params.product
    const cart = req.customer.cart
    const cartProduct = cart.find(cp => cp.productId === +productId)
    const index = cart.indexOf(cartProduct)
    cart.splice(index, 1)
    await writeJson("/customers.json", req.allCustomers)

    res.send({
        success: true,
        data: "deleted"
    })
})


export default router