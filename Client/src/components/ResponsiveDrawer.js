import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Header from "./Header";
import Products from "./Products";
import { useContext } from "react";
import CartContext from "./CartContext";

import RangeSlider from "./RangeSlider";
import { Button, Grid } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#f73378",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
   
  },
}));

function ResponsiveDrawer(props) {
  const { productsCart } = useContext(CartContext);

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //Icone du ShoppingCart
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <ShoppingCartIcon style={{ fontSize: 40 }} color="secondary" />
      <Divider />
      <List>
        {productsCart.map((product) => (
          <ListItem button key={product.title}>
            <img src={product.image} width="100" height="100" />
            <ListItemText primary={product.title} />
            <h5>{product.amount} &emsp;</h5>
            <h5>{(product.price * product.amount).toFixed(2) + "\u0024" }</h5>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            {/* <MenuIcon /> */}
            <ShoppingCartIcon style={{ fontSize: 40 }} color="white" />
          </IconButton>

          <Typography variant="h6" color="inherit" noWrap>
            Products
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <Grid
          container
          direction="row"
         
         justifyContent="flex-start"
        alignItems="center"
        >
          <Grid item xs={3}>
            <Header categories={props.categories} onChange={props.onChange} />
          </Grid>

          <Grid item xs={3}>
            <RangeSlider />
          </Grid>
        </Grid>

        {/* <div className={classes.toolbar} /> */}

         <Products products={props.products}/>

        {/* { props.loader  && <Loader/>}
        <Header categories={props.categories} onChange={props.onChange} />
        <RangeSlider />
        <Products products={props.products} /> */}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
