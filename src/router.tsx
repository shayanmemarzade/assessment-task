import {
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";
import Products from './routes/Products';
import Login from './routes/Login';
import ProtectedRoute from './ProtectedRoute';
import ProductDetail from "./routes/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:productId",
        element: <ProductDetail />,
      }
    ]
  },
  {
    path: "login",
    element: <Login />,
  },

]);

export default router
