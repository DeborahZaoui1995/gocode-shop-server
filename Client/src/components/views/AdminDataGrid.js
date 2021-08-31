import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import ProductsContext from "../ProductsContext";
import Button from "@material-ui/core/Button";
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { blue } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from '@material-ui/icons/Save';
import FormDialog from "../FormDialog";



export default function BasicEditingGrid() {
  const {productsArr } = useContext(ProductsContext);

  const [selectedItem,setSelectedItem] = React.useState([]);

  //return an array of objects
  const rowsOfDB = productsArr;
  const detailsRows = rowsOfDB.map((row) => (row = { ...row, id: row._id }));


  const updateProduct = () => {
    console.log(selectedItem);
    // let id = selectedItem;

    // fetch(`/api/products/${id}`, {
    //   method : "PUT"
    // })
    // .then((res) => res.json());
    // // .then(() => setProducts(products.filter(product => product._id !== id)));
  };


  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={detailsRows} columns={columns}  
      onRowEditCommit = {updateProduct}
      checkboxSelection={false} 
      onSelectionModelChange={itm => setSelectedItem(itm)} 
      components={{Toolbar: EditToolbar,}}/>
    </div>
  );
}



//Actions
let isInEditMode = false;

const MatEdit = ({id} ) => {


  const { products, setProducts} = useContext(ProductsContext);

  const handleEditClick = () => {
    isInEditMode = true;
  };

  const handleSaveClick = () => {

  };


  const removeProduct = () => {
    // console.log({id});

    //let id = selectedItem;*

    // fetch(`/api/products/${id}`, {
    //   method : "DELETE"
    // })
    // .then((res) => res.json())
    // .then(() => setProducts(products.filter(product => product._id !== id)));
  };


  if (isInEditMode) {
    return (
      <div >
        <IconButton
          color="primary"
          size="small"
          aria-label="save"
          onClick={handleSaveClick}
        >
          <SaveIcon fontSize="small" />
        </IconButton>
        <IconButton
              color="secondary"
              onClick={removeProduct}
            >
              <DeleteIcon style={{ color: blue[500] }} />
            </IconButton>
      </div>
    );
  }

    return (
      <FormControlLabel
        control={
          <React.Fragment>
            <IconButton
              color="secondary"
              onClick={handleEditClick}
            >
              <EditIcon style={{ color: blue[500] }} />
            </IconButton>
  
            <IconButton
              color="secondary"
              onClick={removeProduct}
            >
              <DeleteIcon style={{ color: blue[500] }} />
            </IconButton>
          </React.Fragment>
        }
      />
    );
};


//Toolbar avec le bouton Add Product
function EditToolbar() {
 return (
      <FormDialog />
  );
}


const columns = [
  { field: '_id', headerName: "Id"},
  { field: "title", headerName: "Title", width: 250, editable: true },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    type: "number",
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 180,
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    width: 220,
    editable: true,
    type: "singleSelect",
    valueOptions: [
      "men's clothing",
      "jewelery",
      "electronics",
      "women's clothing",
    ],
  },
  {
    field: "image",
    headerName: "Image",
    type:"image",
    width: 220,
    editable: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 140,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
        >
          <MatEdit  index={params.row.id} />
        </div>
      );
    },
  },
];





















 
