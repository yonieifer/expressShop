import { loadJson, writeJson } from "./jsonRepo.js";
import { getProductById } from "./productsRepo.js";


export const productAvailable = async (productId, quantity) => {
    const product = await getProductById(productId)
    if (quantity > product.stock) return false
    return true
}

export const checkout = async (customer, total) => {
    const allProducts = await loadJson("/products.json")
    for (const cartProduct of customer.cart) {
        const product = allProducts.find(p => p.productId === +cartProduct.productId)
            if (product) product.stock -= cartProduct.quantity
        }
    await writeJson("/products.json", allProducts)

    const allCustomers = await loadJson("/customers.json")
    const customerInJson = allCustomers.find(c => c.customerId === customer.customerId)
    if (customerInJson) {
        customer.balance -= total
        customer.cart = []
        Object.assign(customerInJson, customer)
    }
    await writeJson("/customers.json", allCustomers)

    const allOrders = await loadJson("/orders.json")
    const newId = allOrders.length + 1
    const newOrder = {
        "id": newId,
        "customerId": customer.id,
        "items": customer.cart,
        "total": total,
        "createdAt": new Date().toISOString()
    }
    allOrders.push(newOrder)
    await writeJson("/orders.json", allOrders)
    return newId
}