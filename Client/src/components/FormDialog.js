import React from "react";
import { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import ProductsContext from "./ProductsContext";

const categories = [
  {
    value: "men's clothing",
    label: "men's clothing",
  },
  {
    value: "electronics",
    label: "electronics",
  },
  {
    value: "jewelery",
    label: "jewelery",
  },
  {
    value: "women's clothing",
    label: "women's clothing",
  },
];

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const { products, setProducts} = useContext(ProductsContext);

  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [description,setDescription] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [image, setImage] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  //Close the dialog and add the product
  const addProduct = () => {
    setOpen(false);

    const newProduct = {
        title: title,
        price: price,
        description : description,
        category : category,
        image : image,
    };


    fetch("/api/products",
    {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(newProduct),
    })
    .then((res) => res.json())
    .then((product) => setProducts([...products, product]));
  };

  



  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeImage = (event) => {
    setImage(event.target.value);
  };

  return (
    <div>
      <Button startIcon={<AddIcon />} color="primary" onClick={handleClickOpen}>
        Add Product
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Product Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a product, please fulfill the needed fields
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="Title"
            onChange={handleChangeTitle}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Price"
            onChange={handleChangePrice}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            multiline
            maxRows={4}
            onChange={handleChangeDescription}
            fullWidth
          />

          <TextField
            id="standard-select-currency"
            select
            autoFocus
            margin="dense"
            fullWidth
            label="Category"
            value={category}
            onChange={handleChangeCategory}
            helperText="Please select a category"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            label="Image"
            onChange={handleChangeImage}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={addProduct} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
