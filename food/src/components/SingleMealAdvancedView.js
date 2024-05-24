import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

const SingleMealAdvancedView = (props) => {
  if (props.meals[0]) {
    //find one
    const x = props.meals.filter(
      (element) => element.idMeal === props.match.params.id
    );
    //ingredients keys
    let keyz = ""
    let keyss = ""
    if (x[0]) {
      keyz = Object.keys(x[0]).filter((el) => el);
      keyss = keyz
      .filter((el) => x[0][el] !== "")
      .filter((el) => x[0][el] !== null)
      .filter((el) => x[0][el] !== " ");
    }
    if (x[0]){
    return (
      <Grid container xs={12} sm={12} md={12} lg={12} spacing={1} alignItems="center">
      <div className="advancedContent">
      <Grid>
        <div className="imageAndRecipe">
          <img alt="dish" src={x[0].strMealThumb} id="advancedImg"></img>
          {keyss.map((i) => (
            <div id="textAdvanced">
              
              {i.includes("Instructions") ? (
                <>
                <div className="titleAdvanced">RECIPE:</div>
                <div>{x[0][i]}</div>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
        </Grid>
        <Grid>
        <div className="mainContent">
        <div className="titleAdvanced">MAIN INFORMATION:</div>
          {keyss.map((i) => (
            <div>
              {i.includes("Ingr") ||
              i.includes("Measu") ||
              i.includes("Instructions") ? (
                <></>
              ) : (
                i.includes("Youtube") || i.includes("MealThumb") || i.includes("Source") ? <div className="elD">{i.substring(3, i.length)}: <a className="ytlink" href={`${x[0][i]}`}>{x[0][i]}</a></div> :<div className="elD">{i.includes('str') ? i.substring(3, i.length): i}: {x[0][i]}</div>
              )}
            </div>
          ))}
        </div>
        </Grid>
        <Grid>
        <div className="ingredientsAdvanced">
        <div className="titleAdvanced">INGREDIENTS:</div>
          {keyss.map((i) => (
            <div>
              {i.includes("Ingredient") ? (
                <div className="elD">{i.includes("str") ? i.substring(3) : i}: {x[0][i]}</div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
        </Grid>
        <Grid >
        <div className="measurmentsAdvanced">
          <div className="titleAdvanced">MEASURMENTS:</div>
          {keyss.map((i) => (
            <div>
              {i.includes("Measure") ? (
                <div className="elD">{i.includes("str") ? i.substring(3) : i}: {x[0][i]}</div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
        </Grid>
      </div>
      
      </Grid>
    )};
  } else return <></>;
};

const mapStateToProps = (state) => {
  return {
    meals: state.meals,
  };
};

export default connect(mapStateToProps)(SingleMealAdvancedView);
