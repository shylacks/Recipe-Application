import React, { useState } from "react";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { addMeal } from "../redux/rsaa";
import store from "../redux/store";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "45ch",
      padding: "10px",
    },
  },
  formError: {
    fontSize: "12px",
    color: "#c00000",
  },
}));
const AddMeal = (props) => {
  const [ingredients, setIngredients] = useState(1);
  const classes = useStyles();
  const categories = [
    "Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
  ];
  let arrayS = Array(ingredients).fill(0);

  const validateStrName = (value) => {
    let error;
    if (!value) {
      error = "Required";
      return error;
    } else if (value.length > 50) {
      error = `Name is too long`;
      return error;
    } else if (value.length < 3) {
      error = "Name is too short";
      return error;
    }
  };

  const validateCategory = (value) => {
    let error;
    if (!value) {
      error = "Required";
      return error;
    } else if (value.length > 50) {
      error = `Category is too long`;
      return error;
    } else if (value.length < 3) {
      error = "Category is too short";
      return error;
    } else if (!categories.includes(value)) {
      error = "Wrong category";
      return error;
    }
  };
  const validateArea = (value) => {
    let error;
    if (!value) {
      error = "Required";
      return error;
    } else if (value.length > 50) {
      error = `Area is too long`;
      return error;
    } else if (value.length < 3) {
      error = "Area is too short";
      return error;
    }
  };
  const validateLink = (value) => {
    let error;
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    if (value) {
      if (value !== "") {
        if (!value.match(regExp)) {
          error = `Wrong link`;
          return error;
        }
      }
    }
  };

  if (props.meals[0]) {
    return (
      <Formik
        initialValues={{
          strInstructions: "",
          strMealThumb: "",
          strTags: "",
          strYoutube: "",
          strSource: "",
        }}
        onSubmit={(values) => {
          // props.addItem(values);
          store.dispatch(addMeal(values));
          alert("Added")
        }}
      >
        {({ errors, touched, values, handleSubmit, resetForm }) => (
          <form onSubmit={handleSubmit} id="add-form" className={classes.root}>
            <Button type="submit" variant="outlined" color="primary">
              Add Item
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                ingredients === 20
                  ? alert("You cannot have more than 20 ingredients")
                  : setIngredients(ingredients + 1)
              }
            >
              New Ingredient
            </Button>
            <div className="formContent">
              <div className="formContentAdd">
                <Field
                  name="strMeal"
                  type="input"
                  label="Name"
                  validate={validateStrName}
                  as={TextField}
                />
                {errors.strMeal && touched.strMeal && (
                  <div style={{ color: "red" }}>
                    <Typography
                      variant={"caption"}
                      className={classes.formError}
                    >
                      {errors.strMeal}
                    </Typography>
                  </div>
                )}
                <Field
                  name="strCategory"
                  type="input"
                  label="Category"
                  validate={validateCategory}
                  as={TextField}
                />
                {errors.strCategory && touched.strCategory && (
                  <div style={{ color: "red" }}>
                    <Typography
                      variant={"caption"}
                      className={classes.formError}
                    >
                      {errors.strCategory}
                    </Typography>
                  </div>
                )}

                <Field
                  name="strArea"
                  type="input"
                  label="Area"
                  as={TextField}
                  validate={validateArea}
                />
                {errors.strArea && touched.strArea && (
                  <div style={{ color: "red" }}>
                    <Typography
                      variant={"caption"}
                      className={classes.formError}
                    >
                      {errors.strArea}
                    </Typography>
                  </div>
                )}

                <Field
                  name="strMealThumb"
                  type="input"
                  label="Link to thumbnail"
                  require
                  as={TextField}
                />

                <Field
                  name="strTags"
                  type="input"
                  label="Tags"
                  require
                  as={TextField}
                />

                <Field
                  name="strYoutube"
                  type="input"
                  label="Link to Youtube"
                  validate={validateLink}
                  as={TextField}
                />
                {errors.strYoutube && touched.strYoutube && (
                  <div style={{ color: "red" }}>
                    <Typography
                      variant={"caption"}
                      className={classes.formError}
                    >
                      {errors.strYoutube}
                    </Typography>
                  </div>
                )}

                <Field
                  name="strSource"
                  type="input"
                  label="Link to source"
                  require
                  as={TextField}
                />
                <Field
                  name={`strInstructions`}
                  type="input"
                  label="Recipe"
                  multiline
                  rows={4}
                  as={TextField}
                />
              </div>
              <div>
                {arrayS.map((val, ind) => {
                  return (
                    <>
                      <div className="addIngredients">
                        <Field
                          name={`strIngredient${ind + 1}`}
                          type="input"
                          label={`Ingredient ${ind + 1}`}
                          as={TextField}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
              <div>
                {arrayS.map((val, ind) => {
                  return (
                    <>
                      <div className="addMeasurments">
                        <Field
                          name={`strMeasure${ind + 1}`}
                          type="input"
                          label={`Measurment ${ind + 1}`}
                          as={TextField}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            <Button type="submit" variant="outlined" color="primary">
              Add Item
            </Button>
            <Button
              onClick={() => resetForm()}
              type="reset"
              variant="outlined"
              color="primary"
            >
              Reset
            </Button>
          </form>
        )}
      </Formik>
    );
  } else return <></>;
};

const mapStateToProps = (state) => {
  return {
    meals: state.meals,
  };
};

export default connect(mapStateToProps)(AddMeal);
