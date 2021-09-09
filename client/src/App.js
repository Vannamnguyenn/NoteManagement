import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/Routing/ProtectedRoute";
import About from "./views/About";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              render={(props) => <Auth {...props} authRoute="login" />}
              exact
            />
            <Route
              path="/login"
              render={(props) => <Auth {...props} authRoute="login" />}
              exact
            />
            <Route
              path="/register"
              render={(props) => <Auth {...props} authRoute="register" />}
              exact
            />
            <ProtectedRoute path="/dashboard" component={Dashboard} exact />
            <ProtectedRoute path="/about" component={About} exact />
          </Switch>
        </BrowserRouter>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
