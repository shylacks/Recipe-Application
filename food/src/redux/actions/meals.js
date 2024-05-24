import {
  SORT_MEALS,
  SEARCH_MEALS,
  SEARCH_CATEGORY,
  SEARCH_AREA,
  SEARCH_YOUTUBE_VIDEO,
  ADD_TO_SHOPPING_CART,
  REMOVE_FROM_SHOPPING_CART,
  REMOVE_KEY_EDIT_FORM,
} from "../types/types";

export const sortMeals = () => {
  return {
    type: SORT_MEALS,
  };
};

export const searchMeals = (filter) => {
  return {
    type: SEARCH_MEALS,
    payload: {
      filter,
    },
  };
};

export const searchCategory = (category) => {
  return {
    type: SEARCH_CATEGORY,
    payload: {
      category,
    },
  };
};

export const searchArea = (area) => {
  return {
    type: SEARCH_AREA,
    payload: {
      area,
    },
  };
};

export const searchYoutubeVideos = () => {
  return {
    type: SEARCH_YOUTUBE_VIDEO,
  };
};

export const addToShoppingCart = (id) => {
  return {
    type: ADD_TO_SHOPPING_CART,
    payload: {
      id,
    },
  };
};

export const removeFromShoppingCart = (id) => {
  return {
    type: REMOVE_FROM_SHOPPING_CART,
    payload: {
      id,
    },
  };
};

export const removeKeyFromItem = (id, key) => {
  return {
    type: REMOVE_KEY_EDIT_FORM,
    payload: {
      id,
      key,
    },
  };
};
