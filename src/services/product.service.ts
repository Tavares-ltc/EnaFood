import productRepository from "../repositories/product.repository.js";

async function getProducts(page: number = 1) {
    let pageNumber = 1
    if(page > 1){
        pageNumber = page
    }
    return await productRepository.getProducts(pageNumber);
}

const productService = {
    getProducts
}

export default productService