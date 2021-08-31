import "./Products.css";
import Product from "./Product";
import { Grid } from "@material-ui/core";

const Products = ({ products }) => {
  return (
    <Grid container spacing={2}  direction="row" justifyContent="space-around" alignItems="center">
      <section className="products">
        {products.map((product) => 
          
            <Product
              key={product.id}
              id={product._id}
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
              category={product.category}
            />
       
        )}
      </section>
    </Grid>
  );
};

export default Products;
