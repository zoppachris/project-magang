import { Route, Redirect, HashRouter } from "react-router-dom";
import React, { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";

function Routes() {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(
    sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : null
  );
  function PrivateRoute({ ...props }) {
    if (sessionStorage.getItem("userName") && sessionStorage.getItem("userId"))
      return <Route {...props} />;
    else sessionStorage.clear();
    return <Redirect to="/" />;
  }
  const login = (userId) => {
    setIsLogin(true);
    setUserId(userId);
    // console.log("loginRoute userId : ", userId);
  };
  const logout = () => {
    setIsLogin(false);
  };
  return (
    <HashRouter>
      <React.Fragment>
        {isLogin ? (
          <Header
            userName={sessionStorage.getItem("userName")}
            logout={logout}
          />
        ) : null}
        <Route
          exact
          path="/"
          render={(props) => (
            <Login
              name="Login"
              //   userId={userId}
              login={(userIdData) => login(userIdData)}
              {...props}
            />
          )}
        />
        <PrivateRoute
          path="/home"
          render={(props) => <Home name="Home" userId={userId} {...props} />}
        />
        <PrivateRoute
          path="/about"
          render={(props) => <About name="Home" userId={userId} {...props} />}
        />
      </React.Fragment>
    </HashRouter>
  );
}

export default Routes;
