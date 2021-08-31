import { useContext } from "react";
import CartContext from "./CartContext";
import "./Product.css";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    //maxWidth: 345,
    maxWidth: 400,
  },

  media: {
    height: 200,
    width: "100%",
    objectFit: "contain",
  },

  content: {
    textAlign: "center",
    
  
   
  },
  
  typography: {
    overflow: "hidden",
   textOverflow : "ellipsis",
  },

 link: {
  
    textDecoration: "none",
    color:"inherit",
    fontSize:15,
  },
});

const Product = ({ id, title, price, description, category, image }) => {
  const classes = useStyles();

  //Utiliser {} car productsCart es un array
  const { productsCart , setProductsCart} = useContext(CartContext);
 

  const removeFromCart = (id) => {
    let productInCart = productsCart.find((product) => product._id === id);
    if (productInCart && productInCart.amount > 1) {
      setProductsCart(
        productsCart.map((item) =>
          item._id === id
            ? (item = {
                ...item,
                amount: item.amount - 1,
              })
            : item
        )
      );
    } else if (productInCart && productInCart.amount === 1) {
      //On enleve le produit du panier
      setProductsCart(productsCart.filter((product) => product._id !== id));
    }
  };

  //Quand on ajoute un produit au panier
  const addToCart = (id, title, price, image) => {
    let productInCart = true;

    productsCart.map((product) => {
      product._id === id
        ? (productInCart = false)
        : (productInCart = true & productInCart);
    });

    //Si le produit existe deja dans le panier
    if (productInCart === 0 || productInCart === false) {
      setProductsCart(
        productsCart.map((item) =>
          item._id === id
            ? (item = {
                ...item,
                amount: item.amount + 1,
              })
            : item
        )
      );
    }

    //Nouveau produit
    else {
      setProductsCart([
        {
          _id: id,
          title: title,
          price: price,
          image: image,
          amount: 1,
        },
        ...productsCart,
      ]);
    }
  };

  return (
    // <div className="product-card">
    <Grid item xs={3}>
      <div class="product-card">
        <Card className={classes.root}>
          <CardActionArea>
            <div className="product-image">
              <CardMedia
                className={classes.media}
                component="img"
                image={image}
              />
            </div>

            <div className="Product">
              <CardContent className={classes.content}>
                <Typography className={classes.typography}>
                <Link className={classes.link}  to={`/products/${id}`}>
                  {title}
                </Link>
                </Typography>
              </CardContent>
            </div>
          </CardActionArea>

          <CardActions>
            <h5>{price}</h5>

            <Button
              onClick={() => addToCart(id, title, price, image)}
              size="small"
              color="primary"
            >
              Add To Cart
            </Button>

            <Button
              onClick={() => removeFromCart(id)}
              size="small"
              color="primary"
            >
              Remove From Cart
            </Button>
          </CardActions>
        </Card>
      </div>
    </Grid>

    // </div>

    // <div className="product-card">
    //   <div className="product-image">
    //     <img src={image} />
    //   </div>
    //   <div className="product-info">
    //     <h5>
    //       {title}
    //       <br />
    //       {price}
    //     </h5>
    //     <h6>
    //       {description}
    //       <br />
    //       {category}
    //     </h6>
    //     <button onClick={() => addToCart(id, title, price, image)}>Add To Cart</button>
    //   </div>
    // </div>
  );
};

export default Product;
