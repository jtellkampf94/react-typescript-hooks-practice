import Navigation from "./components/Navigation";
import LoginApp from "./components/LoginApp";
import TodosApp from "./components/TodosApp";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/login" component={LoginApp} />
        <Route path="/todos" component={TodosApp} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
