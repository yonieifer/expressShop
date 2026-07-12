import { loadJson } from "./jsonRepo.js";
import { getProductById } from "./productsRepo.js";


export const productAvailable = async (productId, quantity) => {
    const product = await getProductById(productId)
    if (quantity > product.stock) return false
    return true
}

export const checkout = async (customer, total) => {
    const allProducts = await loadJson("/products.json")
    for (const cartProduct of customer.cart) {
        const product = allProducts.find(p => p.productId === cartProduct.productId)
            product.stock -= cartProduct.quantity
        }
    const allOrders = await loadJson("/orders.json")
    const newId = allOrders.length + 1
    const newOrder = {
        "id": newId,
        "customerId": customer.id,
        "items": customer.cart,
        "total": total,
        "createdAt": Date()
    }
    return newId
}