
import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { formatCurrency } from "../helpers"
import { ProductType } from "../types"
import { deleteProduct } from "../Services/ProductService"

type ProductDetailsT = {
    product: ProductType
}

export async function action({params}:ActionFunctionArgs){
    if(params.id!==undefined){
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductsDetails({product}:ProductDetailsT) {

    const fetcher = useFetcher();
    const navigate = useNavigate();
    const isAvailable = product.availability

  return (
    <>
        <tr className="border-b last-of-type:border-none">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800 ">
        {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method="POST">
                <button
                type="submit"
                name="availability"
                value={product.availability.toString()}
                className={`${isAvailable?'text-black':'text-red-600'} rounded-lg p-2 text-xs 
                uppercase font-bold w-full border border-black-300 hover:cursor-pointer 
                hover:bg-gray-300`}
                >
                    {isAvailable?'Disponible': 'No disponible'}
                </button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
                <button
                onClick={()=>navigate(`/productos/${product.id}/editar`)}
                className="bg-indigo-600 font-bold text-white uppercase text-xs w-full rounded-lg px-4 py-1"
                >
                    Editar
                </button>
                <Form 
                className="w-full"
                method="POST"
                action={`productos/${product.id}/eliminar`}
                onSubmit={(e)=>{
                    if(!confirm('Eliminar?')){
                        e.preventDefault();
                    }
                }}
                >
                    <input
                    type="submit"
                    value='eliminar'
                    className="bg-red-600 font-bold text-white uppercase text-xs w-full rounded-lg px-4 py-1"

                    />
                </Form>
            </div>
        </td>
    </tr> 
    </>
  )
}
