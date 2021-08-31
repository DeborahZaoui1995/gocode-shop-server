import React from "react";
import Loader from "../Loader";
import Products from "../Products";
import ResponsiveDrawer from "../ResponsiveDrawer";


function Home ({ loader, categories, onChange, products }) {
  return (
    <React.Fragment>

      {loader && <Loader />}
      <ResponsiveDrawer categories={categories} onChange={onChange} products={products} />
      {/* <Products products={products} /> */}


{/* 
          {loader  && <Loader/>}
          <FullWidthGrid categories={categories} onChange={onChange} />
          <Products products={products} />  */}

            {/* <ResponsiveDrawer
              loader={loader}
              categories={categories}
              onChange={onChange}
              products={products}
            /> */}
    </React.Fragment>
  );
}

export default Home;
