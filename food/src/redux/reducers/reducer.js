import {
  SUCCESS,
  SORT_MEALS,
  SEARCH_MEALS,
  SEARCH_CATEGORY,
  SEARCH_AREA,
  SEARCH_YOUTUBE_VIDEO,
  ADD_TO_SHOPPING_CART,
  REMOVE_FROM_SHOPPING_CART,
  REMOVE_KEY_EDIT_FORM,
  ADD_MEAL_SUCCESS,
  DELETE_MEAL_SUCCESS,
  EDIT_MEAL_SUCCESS,
} from "../types/types";

const _ = require("lodash");

const initialState = {
  meals: [],
  shoppingCart: [],
  sortBy: "strMeal",
  sortOrder: "asc",
  many: "all",
  searcher: "",
  category: "all",
  area: "all",
  showOnlyYt: false,
  maxId: 999999,
};

const meals = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS:
      const x = _.flatten(_.flatten(action.payload));
      return {
        ...state,
        meals: x,
      };
    case SORT_MEALS:
      let ord = "";
      if (state.sortOrder === "asc") {
        ord = "desc";
      } else {
        ord = "asc";
      }
      return {
        ...state,
        sortOrder: ord,
      };
    case SEARCH_MEALS:
      return {
        ...state,
        searcher: action.payload.filter,
      };
    case SEARCH_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
      };
    case SEARCH_AREA:
      return {
        ...state,
        area: action.payload.area,
      };
    case SEARCH_YOUTUBE_VIDEO:
      let yt = "";
      if (state.showOnlyYt === false) {
        yt = true;
      } else {
        yt = false;
      }
      return {
        ...state,
        showOnlyYt: yt,
      };
    case ADD_TO_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload.id],
      };
    case REMOVE_FROM_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(
          (elem) => elem !== action.payload.id
        ),
      };
    case REMOVE_KEY_EDIT_FORM:
      const toDel = state.meals.filter(
        (elem) => elem.idMeal === action.payload.id
      );
      const others = state.meals.filter(
        (elem) => elem.idMeal !== action.payload.id
      );
      delete toDel[0][action.payload.key];
      console.log(toDel[0]);
      return {
        ...state,
        meals: [...others, toDel[0]],
      };
    case ADD_MEAL_SUCCESS:
      const toAdd = action.payload.added;
      return {
        ...state,
        meals: [...state.meals, toAdd.data2],
        maxId: String(state.maxId + 1),
      };
    case DELETE_MEAL_SUCCESS:
      return {
        ...state,
        meals: state.meals.filter(
          (elem) => elem.idMeal !== action.payload.deleted
        ),
        shoppingCart: state.shoppingCart.filter(
          (elem) => elem !== action.payload.deleted
        ),
      };
    case EDIT_MEAL_SUCCESS:
      let rest = state.meals.filter((x) => x.idMeal !== action.payload.edited);
      return {
        ...state,
        meals: [...rest, action.payload.editedBody ],
      };
    default:
      return state;
  }
};

export default meals;
