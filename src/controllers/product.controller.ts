import { Request, Response } from "express";
import productService from "../services/product.service.js";
import { okResponse, serverErrorResponse } from "../helpers/response.helper.js";

async function listProducts(req: Request, res: Response) {
  let { page } = req.query;
  if (!page) {
    page = "1";
  }
  const pageNumber = Number(page);
  try {
    const productList = await productService.getProducts(pageNumber);
    okResponse(res, productList);
  } catch (error) {
    serverErrorResponse(res);
  }
}

async function listProductsByCategory(req: Request, res: Response) {
  const { category } = req.params;
  let { page } = req.query;
  if (!page) {
    page = "1";
  }
  const pageNumber = Number(page);
  try {
    const productList = await productService.getProductsByCategory(category, pageNumber);
    okResponse(res, productList);
  } catch (error) {
    serverErrorResponse(res);
  }
}

const productController = {
  listProducts,
  listProductsByCategory
};

export default productController;
