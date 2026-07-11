import { loadJson } from "./jsonRepo.js";
import { getProductById } from "./productsRepo.js";


export const productAvailable = async (productId, quantity) => {
    const product = await getProductById(productId)
    if (quantity > product.stock) return false
    return true
}