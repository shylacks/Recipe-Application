import './App.css';
import AllMeals from "./components/AllMeals";

import SingleMealAdvancedView from "./components/SingleMealAdvancedView";
import EditMeal from "./components/EditMeal";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AddMeal from './components/AddMeal';
import Cart from './components/Cart';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={AllMeals}/>
          <Route path="/meals/add" exact component={AddMeal}/>
          <Route path="/meals/:id" exact component={SingleMealAdvancedView}/>
          <Route path="/meals/:id/edit" exact component={EditMeal}/>
          <Route path="/cart" exact component={Cart}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
