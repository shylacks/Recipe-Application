import Meal from "./Meal";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import selectors from "../redux/selectors";

const AllMeals = (props) => {
  const [page, setPage] = useState(1);
  const max_page =
    props.sortedMeals.length === 0
      ? 1
      : Math.ceil(props.sortedMeals.length / 12);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const updatePageWhenExcess = (page) => {
    setPage(page);
  };

  if (props.meals[0]) {
    return (
      <>
        <Navbar />
        <div className="AllMeals">
          <Pagination
            page={page > max_page ? updatePageWhenExcess(1) : page}
            onChange={handleChangePage}
            count={max_page}
            color="primary"
            variant = "outlined"
            shape="rounded"
          />
          <Grid container spacing={1}>
            {props.sortedMeals.length === 0 ? <Grid container justify={"center"} item xs={12} sm={12} lg={12}><div className="nothing"> Nothing was found </div></Grid> : props.sortedMeals
              .map((element, index) => {
                return (
                  <Grid justifyContent={"center"} container key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Meal
                      key={index}
                      name={element.strMeal}
                      img={element.strMealThumb}
                      id={element.idMeal}
                      obj={element}
                      cart={props.cart}
                    />
                  </Grid>
                );
              })
              .slice(0 + 12 * (page - 1), 12 + 12 * (page - 1))}
          </Grid>
          <Pagination
            onChange={handleChangePage}
            page={page > max_page ? updatePageWhenExcess(1) : page}
            count={max_page}
            color="primary"
            variant = "outlined"
            shape="rounded"
          />
        </div>
      </>
    );
  } else return <></>;
};

const mapStateToProps = (state) => {
  return {
    meals: state.meals,
    cart: state.shoppingCart,
    sortedMeals: selectors.selectorAll(state),
  };
};

export default connect(mapStateToProps)(AllMeals);
