import { loadJson } from "./jsonRepo.js";

export default async (req, res, next) => {
    try {
        const allCustomers = await loadJson("/customers.json")
        const customerId = req.query.customerId || req.body.customerId

        if (!customerId) {
        return res
            .status(400)
            .send({ success: false, message: `customerId not found`});
        }

        const customer = allCustomers.find(c => c.customerId === +customerId)

        if (!customer) {
        return res
            .status(400)
            .send({ success: false, message: `Custom ${customerId} not exists`});
        }

        req.customer = customer

    } catch (error) {
        res.status(500).send({"success": false, "message": "Server internal error"})
        console.log("unable find user", error);
    }
}
