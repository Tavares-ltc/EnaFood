import Product from "../models/product.model.js";

const pageSize = 50;

async function getProducts(pageNumber: number = 1) {
  const productsList = await Product.find()
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
    .exec();
  return productsList;
}

async function getProductsByCategory(category: string, pageNumber = 1) {
  const products = await Product.find({ category: category })
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
    .exec();
  return products;
}

async function getProductById(productId: string) {
  const product = await Product.findOne({ _id: productId });
  return product;
}

const productRepository = {
  getProducts,
  getProductsByCategory,
  getProductById
};

export default productRepository;
