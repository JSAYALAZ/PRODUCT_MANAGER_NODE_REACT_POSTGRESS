
import { useNavigate } from "react-router-dom"
import { formatCurrency } from "../helpers"
import { ProductType } from "../types"

type ProductDetailsT = {
    product: ProductType
}

export default function ProductsDetails({product}:ProductDetailsT) {

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

        {isAvailable?'Disponible': 'No disponible'}
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
                <button
                onClick={()=>navigate(`/productos/${product.id}/editar`)}
                className="bg-indigo-600 font-bold text-white uppercase text-xs w-full rounded-lg px-4 py-1"
                >
                    Editar
                </button>

            </div>
        </td>
    </tr> 
    </>
  )
}
