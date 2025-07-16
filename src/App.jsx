
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import PageHome from './page/home/HomePage'
import RootLayout from './RootLayout'
import { loader as loaderProducts } from './components/Products/Products'
import ShopPage from './page/shop/ShopPage'
import ProductDetail from './components/shop/ProductDetail'
import SignIn, { action as signInAction } from './components/auth/SignIn'
import SignUp, { action as signUpAction } from './components/auth/SignUp'
import Cart from './components/cart/Cart'
import FavoritePage from './page/favorite/FavoritePage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <PageHome />,
        loader: loaderProducts
      },
      {
        path: '/shop',
        element: <ShopPage />,
        loader: loaderProducts
      },
      {
        path :'/shop/:category',
        element: <ShopPage />,
        loader: loaderProducts
      },
      {
        path :'/favorite',
        element: <FavoritePage />
      },
      {
        path:'/shop/detail/:idProduct',
        element: <ProductDetail />,
        loader: loaderProducts
      },
      {
        path:'/signIn',
        element:<SignIn />,
        action : signInAction
      },
      {
        path:'/signup',
        element:<SignUp />,
        action: signUpAction
      },
      {
        path:'/cart',
        element: <Cart />
      }
    ]
  }
])
function App() {
  return <RouterProvider router={router} />
}

export default App
