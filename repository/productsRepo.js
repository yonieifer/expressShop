import { loadJson } from "./jsonRepo.js";


export const getProductById = async (id) => {
    const allProducts = await loadJson("/products.json");
    const product = allProducts.find(p => p.id === +id)
    return product
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

