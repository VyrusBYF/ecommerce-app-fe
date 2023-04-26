import { Route, Routes } from "react-router";
import { Footer } from "./Home/Footer";
import { Header } from "./Home/Header";
import { Home } from "./Home/Home";
import { Catalog } from "./Shopping/Catalog";
import "./_meta/css/App.css";
import { ProductDetailsPage } from "./Shopping/ProductDetailsPage";
import { Checkout } from "./Shopping/Checkout";
import { Login } from "./Home/Account/Login";
import { Registration } from "./Home/Account/Registration";
import { CartDetailsPage } from "./Shopping/Cart/CartDetailsPage";
import { ErrorPage } from "./_shared/ErrorPage";

function App(): JSX.Element {
  const routes: {
    Element: JSX.Element;
    Link: string;
    Name: string;
  }[] = [
    { Name: "Checkout", Link: "/checkout", Element: <Checkout /> },
    { Name: "Cart", Link: "/cart", Element: <CartDetailsPage /> },
    { Name: "Error", Link: "*", Element: <ErrorPage /> },
    { Name: "Home", Link: "/ecommerce-fe", Element: <Home /> },
    // { Name: "Login", Link: "/login", Element: <Login /> },
    { Name: "Product Details", Link: "/product-details/:productID", Element: <ProductDetailsPage /> },
    // { Name: "Register", Link: "/register", Element: <Registration /> },
    { Name: "Shop", Link: "/shop", Element: <Catalog /> }
  ];

  return (
    <div className="App">
      <Header />
      <div className="d-flex flex-column min-vh-100 mt-4">
        <Routes>
          {routes.map(route => (
            <Route
              path={route.Link}
              element={route.Element}
              key={route.Name}
            />
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
