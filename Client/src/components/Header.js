
import "./Header.css";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },

}));

const Header = ({ categories, onChange }) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    category: '',
    name: 'hai',
  });

  return (
    <nav class="product-filter">
      <div className="sort">
        <div className="collection-sort">

          <FormControl className={classes.formControl}>
            <InputLabel shrink>Filter by</InputLabel>
            <NativeSelect
              value={state.category}
              onChange={onChange}
              inputProps={{
                name: "age",
                id: "age-native-label-placeholder",
              }}
            >
              {/* <option value="">None</option>
              <option value={1}>Ten</option>
              <option value={2}>Twenty</option>
              <option value={3}>Thirty</option> */}

              {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}

            </NativeSelect>
          </FormControl>

          {/* <label>Filter by:</label>
          <select onChange={onChange}>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select> */}

        </div>
      </div>
    </nav>
  );
};

export default Header;
