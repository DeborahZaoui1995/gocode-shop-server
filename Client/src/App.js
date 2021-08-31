import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import CartContext from "./components/CartContext";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import ProductsContext from "./components/ProductsContext";
import Header from "./components/Header";
import Products from "./components/Products";
import Loader from "./components/Loader";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import FullWidthGrid from "./FullWidthGrid";
import Home from "./components/views/Home";
import ProductDetails from "./components/views/ProductDetails";
import AdminDataGrid from "./components/views/AdminDataGrid";



const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    rv[x[key]] = true || [];
    return rv;
  }, {});

function App() {
  const [productsArr, setProductsArr] = useState([]);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [categories, setCategories] = useState([]);
  //le array qui contient les produits du panier
  const [productsCart, setProductsCart] = useState([]);
  //const [color, setColor] = useState("blue");

  useEffect(() => {
    setLoader(true);

    fetch("/api/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setProductsArr(json);
        setCategories(["All", ...Object.keys(groupBy(json, "category"))]);
        setLoader(false);
      });
  }, []);

  //Affiche seulement les produits qui ont la categorie selectionee
  const onChange = (event) => {
    if (event.target.value === "All") setProducts(productsArr);
    else
      setProducts(
        productsArr.filter((product) => product.category === event.target.value)
      );
  };

  return (
    <CartContext.Provider value={{ productsCart, setProductsCart }}>
      <ProductsContext.Provider value={{ products, setProducts, productsArr }}>
        <Router>
          <div className="App">
            <nav>
              <ul>
                <li>
                  <Link to="/" color="inherit" top={80}>
                    Home
                  </Link>
                </li>

                <li>  
                  <Link to="/products/admin"color="inherit" top={200}>
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>

            <br />
            <br />
            <br />

            <Switch>

            <Route path="/products/admin">
                <AdminDataGrid />
              </Route>

              <Route path="/products/:id">
                <ProductDetails />
              </Route>

              <Route path="/">
                <header className="App-header">
                  <Home
                    loader={loader}
                    categories={categories}
                    onChange={onChange}
                    products={products}
                  />
                </header>
              </Route>
            </Switch>
          </div>
        </Router>
      </ProductsContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
