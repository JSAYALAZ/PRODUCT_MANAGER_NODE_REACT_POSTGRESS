import { Request, Response, request, response } from "express";
import Product from "../models/Product.model";
import colors from "colors";

export const getProducts = async (request: Request, response: Response) => {
  const productos = await Product.findAll();
  response.json({ productos: productos });
};

export const createProduct = async (requese: Request, response: Response) => {
  const product = new Product(requese.body);
  const saveProduct = await product.save();
  response.status(201).json({ data: saveProduct });
};

export const getProductsById = async (requese: Request, response: Response) => {
  try {
    const { id } = requese.params;

    const producto = await Product.findByPk(id,
      //{attributes: { exclude: ["updatedAt", "createdAt", "availability"] },}
    );

    if (!producto) {
      response.status(404).json({
        error: "Producto no encontrado",
      });
    }
    response.json({ product: producto });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (requese: Request, response: Response) => {
  try {
    const { id } = requese.params;
    const producto = await Product.findByPk(id, {
      attributes: { exclude: ["updatedAt", "createdAt", "availability"] },
    });
    !producto && response.status(404).json({ error: "Producto no encontrado" });
    await producto.update(requese.body);
    await producto.save();
    response.json({ data: producto });
  } catch (error) {
    console.log(error);
  }
};

export const updateAvailibility = async (
  requese: Request,
  response: Response
) => {
  try {
    const { id } = requese.params;
    const producto = await Product.findByPk(id);
    !producto && response.status(404).json({ error: "Producto no encontrado" });
    producto.availability = !producto.dataValues.availability;
    await producto.save();
    response.json({ data: producto });
  } catch (error) {
    console.log(error)
  }
};
export const deleteProduct = async (request: Request, response: Response) => {
  const { id } = request.params;
  const producto = await Product.findByPk(id);
  if (!producto) {
    return response.status(404).json({ error: "Producto no encontrado" });
  }
  await producto.destroy();
  return response.json({ data: "Producto eliminado" });
};
