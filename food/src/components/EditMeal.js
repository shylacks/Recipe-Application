import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { removeKeyFromItem } from "../redux/actions/meals";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import store from "../redux/store";
import { editMeal } from "../redux/rsaa";
const _ = require("lodash");
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "45ch",
      padding: "10px",
    },
  },
}));
const EditMeal = (props) => {
  const classes = useStyles();
  if (props.meals[0]) {
    //find one
    const x = props.meals.filter(
      (element) => element.idMeal === props.match.params.id
    );
    let keyss = ""
    if (x[0]) {
      keyss = Object.keys(x[0]).filter((el) => el);
    }
    const notDeletable = ["idMeal"];
    if (x[0]){
    return (
      <Formik
        initialValues={{
          idMeal: x[0].idMeal,
          strMeal: x[0].strMeal,
          strCategory: x[0].strCategory,
          strArea: x[0].strArea,
          strInstructions: x[0].strInstructions,
          strMealThumb: x[0].strMealThumb,
          strTags: x[0].strTags,
          strYoutube: x[0].strYoutube,
          strSource: x[0].strSource,
        }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          _.forIn(values, function (value, key) {
            console.log(key + " " + value);
          });
          store.dispatch(editMeal(x[0].idMeal, values));
          window.location.reload(true);
          alert("Edited")
        }}
      >
        <Form id="add-form" className={classes.root} key="FORM123">
          <Button type="submit" variant="outlined" color="primary">
            Edit Item
          </Button>
          <div className="formContent" key="FORM13">
            <div className="formContentAdd" key="FORM12">
              {keyss.map((i, ind) => (
                <div key={ind}>
                  {notDeletable.includes(i) ||
                  i.includes("Ingr") ||
                  i.includes("Measu") ? (
                    <></>
                  ) : (
                    <Field
                      name={i}
                      key={ind}
                      label={i}
                      type="input"
                      className="input"
                      defaultValue={x[0][i] || ""}
                      require
                      as={TextField}
                    />
                  )}
                </div>
              ))}
            </div>
            <div>
              {keyss.map((i, ind) => (
                <div key={ind}>
                  {i.includes("Ingredient") ? (
                    <Field
                      name={i}
                      key={ind}
                      label={i.includes("str") ? i.substring(3) : i}
                      type="input"
                      className="input"
                      defaultValue={x[0][i] || ""}
                      require
                      as={TextField}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
            <div>
              {keyss.map((i, ind) => (
                <div key={ind}>
                  {i.includes("Measure") ? (
                    <Field
                      name={i}
                      key={ind}
                      label={i.includes("str") ? i.substring(3) : i}
                      type="input"
                      className="input"
                      defaultValue={x[0][i] || ""}
                      require
                      as={TextField}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" variant="outlined" color="primary">
            Edit Item
          </Button>
        </Form>
      </Formik>
    )};
  } else return <></>;
};

const mapStateToProps = (state) => {
  return {
    meals: state.meals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeKeyFromItem: (id, key) => dispatch(removeKeyFromItem(id, key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMeal);
