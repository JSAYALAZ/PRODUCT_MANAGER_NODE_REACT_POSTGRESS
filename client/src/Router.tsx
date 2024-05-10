import { createBrowserRouter }from 'react-router-dom'
import Layout from './Layout/layout'
import NewProduct,{action as NewProductAction} from './Views/NewProduct'
import Products, {loader as productsLoader} from './Views/Products'
import ProductEdit, {loader as editProductLoader} from './Views/ProductEdit'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children:[
            {
                index: true,
                element: <Products/>,
                loader: productsLoader 
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct/>,
                action: NewProductAction
            },
            {
                path: 'productos/:id/editar',  //ROA PATTERN
                element: <ProductEdit/>,
                loader: editProductLoader
            }
        ]
    },
    
])