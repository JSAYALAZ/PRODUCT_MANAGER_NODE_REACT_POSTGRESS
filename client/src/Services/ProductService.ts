import { safeParse } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductSchema, ProductsSchema } from "../types";

type productData={
    [k: string]: FormDataEntryValue;
}

export async function  addProduct(data:productData){
    try {
        const result = safeParse(DraftProductSchema,{
            name: data.name,
            price: +data.price
        } )
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url,{
                name:result.output.name,
                price: result.output.price
            })
            
        }else{
            throw new Error("Invalid Data")
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data}= await axios(url)
        const result = safeParse(ProductsSchema, data.productos)
        console.log(result)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error ')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id:number) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios.get(url)
        const result = safeParse(ProductSchema, data.product)
        if(result.success===true){
            return result.output
        }else{
            throw new Error('Error en get a product by Id')
        }
        
    } catch (error) {
        console.log(error)
    }
}