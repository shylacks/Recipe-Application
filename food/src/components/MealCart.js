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
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    marginTop: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
      <Card className={classes.root}>
        <CardHeader
          action={
            <Link to={`/meals/${props.id}/edit`}>
              <EditIcon />
            </Link>
          }
          title={props.name}
          subheader={props.obj.strCategory}
        />

        <Link to={`/meals/${props.id}`}>
          <CardMedia
            className={classes.media}
            image={props.img}
            title="Paella dish"
          />
        </Link>
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
            <RemoveShoppingCartIcon/>
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
