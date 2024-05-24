import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  addToShoppingCart,
  removeFromShoppingCart,
} from "../redux/actions/meals";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteMeal } from "../redux/rsaa";
import store from "../redux/store";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 220,
    height: "auto",
    marginTop: 10,
    backgroundColor: "#0984e3",
    border: "1px solid black"
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const Meal = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const keysIngredients = Object.keys(props.obj).filter((el) =>
    el.includes("strIngredient")
  );

  return (
    <div className="singleMeal" key={props.id}>
      <Card className={classes.root} > 
        <Link to={`/meals/${props.id}`}>
          <CardMedia
            className={classes.media}
            image={props.img}
            title={props.name}
          />
        </Link>
        <CardHeader
          action={
            <Link id="nameOfCard" to={`/meals/${props.id}/edit`}>
              <EditIcon />
            </Link>
          }
          title={<Link id="nameOfCard" to={`/meals/${props.id}`}>{ props.name.length < 30 ? props.name : props.name.substring(0,30)+ "..."}</Link>}
          subheader={props.obj.strCategory}
          id="mealTop"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.obj.strTags}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={
              props.cart.includes(props.id) === true
                ? function () {
                    props.removeFromShoppingCart(props.id);
                  }
                : function () {
                    props.addToShoppingCart(props.id);
                  }
            }
            aria-label="add to shopping cart"
          >
            {props.cart.includes(props.id) ? (
              <RemoveShoppingCartIcon />
            ) : (
              <ShoppingCartIcon />
            )}
          </IconButton>
          <IconButton
            onClick={function () {
              store.dispatch(deleteMeal(props.id));
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>How many ingredients:</Typography>
            <Typography paragraph>{keysIngredients.filter(a => props.obj[a] !== "").filter(a => props.obj[a] !== null).length}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToShoppingCart: (id) => dispatch(addToShoppingCart(id)),
    removeFromShoppingCart: (id) => dispatch(removeFromShoppingCart(id)),
  };
};

export default connect(undefined, mapDispatchToProps)(Meal);
