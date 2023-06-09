import productRepository from "../repositories/product.repository.js";

async function getProducts(page: number = 1) {
  let pageNumber = 1;
  if (page > 1) {
    pageNumber = page;
  }
  return await productRepository.getProducts(pageNumber);
}

async function getProductsByCategory(categoryInput: string, page: number = 1) {
  let pageNumber = 1;
  if (page > 1) {
    pageNumber = page;
  }
  const category = categoryInput.toLowerCase();
  return await productRepository.getProductsByCategory(category, pageNumber);
}

const productService = {
  getProducts,
  getProductsByCategory,
};

export default productService;
