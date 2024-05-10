import { object, string, number, boolean, Output, array } from "valibot";

export const DraftProductSchema=object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})


// cambia un schema  a type
export const ProductsSchema = array(ProductSchema)
export type ProductType = Output<typeof ProductSchema>