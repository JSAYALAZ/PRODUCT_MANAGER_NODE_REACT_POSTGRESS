import { createBrowserRouter }from 'react-router-dom'
import Layout from './Layout/layout'
import NewProduct,{action as NewProductAction} from './Views/NewProduct'
import Products, {loader as productsLoader, action as AvailabilityAction} from './Views/Products'
import ProductEdit, {loader as editProductLoader, action as editProductAction} from './Views/ProductEdit'
import { action as deleteProductAction } from './Components/ProductsDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children:[
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action: AvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct/>,
                action: NewProductAction
            },
            {
                path: 'productos/:id/editar',  //ROA PATTERN
                element: <ProductEdit/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:id/eliminar',  //ROA PATTERN
                action: deleteProductAction
            }
        ]
    },
    
])