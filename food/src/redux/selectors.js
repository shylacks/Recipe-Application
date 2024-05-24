import { createSelector } from "reselect";
const _ = require("lodash");

const selectAllMeals = (state) => state.meals;
const selectManyMeals = (state) => state.many;
const selectSortName = (state) => state.sortBy;
const selectSortOrder = (state) => state.sortOrder;
const selectFilter = (state) => state.searcher;
const selectCategory = (state) => state.category;
const selectArea = (state) => state.area;
const selectYoutube = (state) => state.showOnlyYt;

const selectorAll = createSelector(
  [
    selectAllMeals,
    selectManyMeals,
    selectSortName,
    selectSortOrder,
    selectFilter,
    selectCategory,
    selectArea,
    selectYoutube,
  ],
  (
    allMeals,
    manyMeals,
    sortBy,
    order,
    filterSearch,
    category,
    area,
    onlyYT
  ) => {
    let slicer = 0;
    if (manyMeals === "all") {
      slicer = allMeals.length;
    } else {
      slicer = selectManyMeals;
    }
    let filteredMeals = _.orderBy(allMeals.slice(0, slicer), [sortBy], [order]);

    let categoryFilter = "";
    if (category !== "all") {
      categoryFilter = category;
    } else if (category === "all") {
      categoryFilter = "";
    }
    let areaFilter = "";
    if (area !== "all") {
      areaFilter = area;
    } else if (area === "all") {
      areaFilter = "";
    }
    let onlyYoutube = "";
    if (onlyYT === true) {
      onlyYoutube = "";
    } else {
      onlyYoutube = "youtube";
    }

    if (filteredMeals)
    return filteredMeals
      .filter((x) =>
        x.strMeal.toLowerCase() ? x.strMeal.toLowerCase().includes(filterSearch.toLowerCase()) : 0
      )
      .filter((x) => x.strCategory.includes(categoryFilter))
      .filter((x) => x.strArea.includes(areaFilter))
      .filter((x) => x.strYoutube !== onlyYoutube);
  }
);
// filteredMeals.filter(elem => elem.strCategory === category)
const selectors = {
  selectorAll,
};

export default selectors;
