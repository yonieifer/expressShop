import { loadJson } from "./jsonRepo.js";


export const getAllProducts = async () => {
    const allProducts = await loadJson("/products.json");
    return allProducts
}

export const getFilteredProducts = async ({inStock, maxPrice, search}) => {
    try {
        const allProducts = await loadJson("/products.json")
        const filteredProducts = allProducts.filter(product => {
        if (inStock && product.stock <= 0) return false
        if (maxPrice && product.price > +maxPrice) return false
        if (search && !product.name.includes(search)) return false
        return true
        })
    return filteredProducts
    } catch (error) {
        console.log(error);
    }
}

