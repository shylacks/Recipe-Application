import {
  REQUEST,
  SUCCESS,
  FAILURE,
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE,
  DELETE_MEAL_REQUEST,
  DELETE_MEAL_SUCCESS,
  DELETE_MEAL_FAILURE,
  EDIT_MEAL_REQUEST,
  EDIT_MEAL_SUCCESS,
  EDIT_MEAL_FAILURE,
} from "./types/types";
import { createAction } from "redux-api-middleware";

export const getMeals = () => (dispatch) =>
  dispatch(
    createAction({
      endpoint: "http://localhost:5000/meals",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [REQUEST, SUCCESS, FAILURE],
    })
  );

export const addMeal = (mealData) => (dispatch) => {
  console.log(1);
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/meals/2}`,
      method: "POST",
      body: JSON.stringify(mealData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [ADD_MEAL_REQUEST, ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE],
    })
  );
};

export const deleteMeal = (id) => (dispatch) => {
  console.log(1);
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/meals/${id}}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [DELETE_MEAL_REQUEST, DELETE_MEAL_SUCCESS, DELETE_MEAL_FAILURE],
    })
  );
};

export const editMeal = (id, mealData) => (dispatch) =>
    dispatch(
        createAction({
            endpoint: `http://localhost:5000/meals/${id}}`,
            method: "PUT",
            body: JSON.stringify(mealData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            types: [EDIT_MEAL_REQUEST, EDIT_MEAL_SUCCESS, EDIT_MEAL_FAILURE],
        })
    );
