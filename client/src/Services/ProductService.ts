import { safeParse, coerce, number, parse } from "valibot";
import axios from "axios";
import {
    DraftProductSchema,
    ProductSchema,
    ProductsSchema,
    ProductType,
} from "../types";
import { toBoolean } from "../helpers";

type productData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: productData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Invalid Data");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    const result = safeParse(ProductsSchema, data.productos);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error ");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: ProductType["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema, data.product);
    if (result.success === true) {
      return result.output;
    } else {
      throw new Error("Error en get a product by Id");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: productData, id: ProductType["id"]) {
  try {
    const NumberSchema = coerce(number(), Number);
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: ProductType["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}
