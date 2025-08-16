import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from "./pages/Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Cart } from "./pages/Cart";
import { Step1 } from "./pages/Step1";
import { Step2 } from "./pages/Step2";
import Step3 from "./pages/Step3";
import Order from "./pages/order";
import Error from "./pages/Error";
import { ProductManagement } from "./pages/Productmanagement";
import { ProductEdit } from "./pages/ProductEdit";
import { Admin_order } from "./pages/Admin_order";
import { Additem } from "./pages/Additem";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Profile } from "./pages/Profile";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const router = createBrowserRouter([
    {
      path: "/home",
      element: (
        <div>
          <Header setSearchTerm={setSearchTerm} />
          <Home searchTerm={searchTerm} />
          <Footer />
        </div>
      )
    },
    {
      path: "/profile",
      element: (
        <div>
          <Header />
          <Profile />
          <Footer />
        </div>
      )
    }
    ,
    {
      path: "/login",
      element: (
        <div>
          <Header />
          <Login />
          <Footer />
        </div>
      )
    },
    {
      path: "/signup",
      element: (
        <div>
          <Header />
          <Signup />
          <Footer />
        </div>
      )
    },
    {
      path: "/cart",
      element: (
        <div>
          <Header />
          <Cart />
          <Footer />
        </div>
      )
    },
    {
      path: "/buy/:id",
      element: (
        <div>
          <Header />
          <Step1 />
          <Footer />
        </div>
      )
    },
    {
      path: "/payment",
      element: (
        <div>
          <Header />
          <Step2 />
          <Footer />
        </div>
      )
    },
    {
      path: "/Step3",
      element: (
        <div>
          <Header />
          <Step3 />
          <Footer />
        </div>
      )
    },
    {
      path: "/your-order",
      element: (
        <div>
          <Header />
          <Order />
          <Footer />
        </div>
      )
    },
    {
      path: "/admin/products",
      element: (
        <div>
          <Header />
          <ProductManagement />
          <Footer />
        </div>
      )
    },
    {
      path: "/admin/edit-product/:id",
      element: (
        <div>
          <Header />
          <ProductEdit />
          <Footer />
        </div>

      )
    },
    {
      path: "/admin/orders",
      element: (
        <div>
          <Header></Header>
          <Admin_order />
          <Footer></Footer>
        </div>
      )
    },
    {
      path: "/admin/add-item",
      element: (
        <div>
          <Header />
          <Additem />
          <Footer />
        </div>
      )
    },
    {
      path: "/admin/dashboard",
      element: (
        <div>
          <Header />
          <AdminDashboard />
          <Footer />

        </div>
      )
    },
    {
      path: "/*",
      element: <Error />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
