import { loadJson } from "./jsonRepo.js";

export const findCustomerById = async (customerId) => {
    try {
        const allCustomers = await loadJson("/customers.json")
        const customer = allCustomers.find(c => c.customerId === +customerId)
        return customer
    } catch (error) {
        console.log("unable find user", error);
    }
}
