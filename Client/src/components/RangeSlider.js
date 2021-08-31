import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import ProductsContext from "./ProductsContext";

const useStyles = makeStyles({
  root: {
    width: 600,
   
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const classes = useStyles();
 
  const { productsArr,setProducts } = useContext(ProductsContext);


  let maxValue = Math.max.apply(Math,productsArr.map(function(o) { return o.price; }));
  let minValue = Math.min.apply(Math,productsArr.map(function(o) { return o.price; }));
  const [min, setMin] = React.useState(minValue);
  const [max, setMax] = React.useState(maxValue);

  let [value, setValue] = React.useState([min, max]);


  const handleChange = (event, newValue) => {
    setProducts(productsArr.filter((product) => product.price <= newValue[1]));
    setValue(newValue);
  };



  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
