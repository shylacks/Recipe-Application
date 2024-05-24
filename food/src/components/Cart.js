import Meal from "./MealCart";
import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const Cart = (props) => {
  const cartIds = props.cart;
  const items = props.meals.filter((x) => cartIds.includes(x.idMeal));
  console.log(cartIds);
  console.log(items);

  if (props.meals[0]) {
    return (
      <>
        <div className="AllCart">
          <div className="cartNav">
            {" "}
            SHOPPING CART <ShoppingBasketIcon />
          </div>
          <Grid container spacing={1}>
            {items.length === 0 ? (
              <Grid container justify={"center"} item xs={12} sm={12} lg={12}>
                <div>There is nothing in cart</div>{" "}
              </Grid>
            ) : (
              items.map((element) => {
                return (
                  <Grid justify={"center"} container item xs={12} sm={4} lg={3}>
                    <div>
                      <Meal
                        key={element.idMeal}
                        name={element.strMeal}
                        img={element.strMealThumb}
                        id={element.idMeal}
                        obj={element}
                        cart={props.cart}
                      />
                    </div>
                  </Grid>
                );
              })
            )}
          </Grid>
        </div>
      </>
    );
  } else return <></>;
};

const mapStateToProps = (state) => {
  return {
    meals: state.meals,
    cart: state.shoppingCart,
  };
};

export default connect(mapStateToProps)(Cart);
