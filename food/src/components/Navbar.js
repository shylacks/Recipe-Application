import React, { useState } from "react";
import {
  searchMeals,
  sortMeals,
  searchCategory,
  searchArea,
  searchYoutubeVideos,
} from "../redux/actions/meals";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Navbar = (props) => {
  const [input, setInput] = useState(props.state.filter);
  const [category, setCategory] = useState(props.state.category);
  const [area, setArea] = useState(props.state.area);

  const handleInputChange = (e) => {
    props.searchMeals(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.searchMeals(input);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    props.searchCategory(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
    props.searchArea(e.target.value);
  };

  const resetForm = () => {
    props.searchCategory("all");
    props.searchArea("all");
    props.searchMeals("");
    setInput("");
    setCategory("all");
    setArea("all");
  };

  const classes = useStyles();

  return (
    <div className="mainNavbar" >
      <form onSubmit={onSubmit}>
        <div className="searcher">
          <TextField
            onChange={handleInputChange}
            id="outlined-basic"
            label="Search"
          />
        </div>
        <div className="categories">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              onChange={handleCategoryChange}
            >
              <MenuItem value={`all`}>All</MenuItem>
              <MenuItem value={`Beef`}>Beef</MenuItem>
              <MenuItem value={`Breakfast`}>Breakfast</MenuItem>
              <MenuItem value={`Chicken`}>Chicken</MenuItem>
              <MenuItem value={`Dessert`}>Dessert</MenuItem>
              <MenuItem value={`Goat`}>Goat</MenuItem>
              <MenuItem value={`Lamb`}>Lamb</MenuItem>
              <MenuItem value={`Miscellaneous`}>Miscellaneous</MenuItem>
              <MenuItem value={`Pasta`}>Pasta</MenuItem>
              <MenuItem value={`Pork`}>Pork</MenuItem>
              <MenuItem value={`Seafood`}>Seafood</MenuItem>
              <MenuItem value={`Side`}>Side</MenuItem>
              <MenuItem value={`Starter`}>Starter</MenuItem>
              <MenuItem value={`Vegan`}>Vegan</MenuItem>
              <MenuItem value={`Vegetarian`}>Vegetarian</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Area</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={area}
              onChange={handleAreaChange}
            >
              <MenuItem value={`all`}>All</MenuItem>
              <MenuItem value={`American`}>American</MenuItem>
              <MenuItem value={`British`}>British</MenuItem>
              <MenuItem value={`Canadian`}>Canadian</MenuItem>
              <MenuItem value={`Chinese`}>Chinese</MenuItem>
              <MenuItem value={`Dutch`}>Dutch</MenuItem>
              <MenuItem value={`Egyptian`}>Egyptian</MenuItem>
              <MenuItem value={`French`}>French</MenuItem>
              <MenuItem value={`Greek`}>Greek</MenuItem>
              <MenuItem value={`Indian`}>Indian</MenuItem>
              <MenuItem value={`Irish`}>Irish</MenuItem>
              <MenuItem value={`Italian`}>Italian</MenuItem>
              <MenuItem value={`Jamaican`}>Jamaican</MenuItem>
              <MenuItem value={`Japanese`}>Japanese</MenuItem>
              <MenuItem value={`Kenyan`}>Kenyan</MenuItem>
              <MenuItem value={`Malaysian`}>Malaysian</MenuItem>
              <MenuItem value={`Mexican`}>Mexican</MenuItem>
              <MenuItem value={`Moroccan`}>Moroccan</MenuItem>
              <MenuItem value={`Polish`}>Polish</MenuItem>
              <MenuItem value={`Russian`}>Russian</MenuItem>
              <MenuItem value={`Spanish`}>Spanish</MenuItem>
              <MenuItem value={`Thai`}>Thai</MenuItem>
              <MenuItem value={`Tunisian`}>Tunisian</MenuItem>
              <MenuItem value={`Turkish`}>Turkish</MenuItem>
              <MenuItem value={`Unknown`}>Unknown</MenuItem>
              <MenuItem value={`Vietnamese`}>Vietnamese</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                onChange={props.searchYoutubeVideos}
                icon={<YouTubeIcon />}
                checkedIcon={<YouTubeIcon />}
                name="checkedYT"
              />
            }
            label="Youtube video"
          />
        </div>
        <div className="sortButton">
          <Button variant="contained" id="button" color="primary" onClick={props.sortMeals}>
            Sort by Name
          </Button>
          <Button variant="contained" id="button" color="primary" onClick={resetForm}>
            Reset
          </Button>
          <Link to={`/meals/add`}>
            <Button variant="contained" id="button" color="primary">
              Add Meal
            </Button>
          </Link>
          <Link to={`/cart`}>
            <Button variant="contained" id="button" color="primary">
              View ordered
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortMeals: () => dispatch(sortMeals()),
    searchMeals: (filter) => dispatch(searchMeals(filter)),
    searchCategory: (category) => dispatch(searchCategory(category)),
    searchArea: (area) => dispatch(searchArea(area)),
    searchYoutubeVideos: () => dispatch(searchYoutubeVideos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
