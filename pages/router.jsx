import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authen/Login";
import Logout from "./components/authen/Logout";
import ResetPassword from "./components/authen/ResetPassword";
import ChangePassword from "./components/authen/ChangePassword";
import Profile from "./components/Profile";
import Default from "./components/Default";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

export default function AppRoute(props) {
  return (
    <Suspense fallback={""}>
      <Router>
        <Route
          path="/login"
          component={(p) => (
            <Login {...p} user={props.user} setUser={props.setUser} />
          )}
        />
        <Route
          path="/logout"
          component={(p) => <Logout {...p} setUser={props.setUser} />}
        />
        <Route path="/resetPassword" component={ResetPassword} />
        <Route path="/changePassword/:token" component={ChangePassword} />
        <Route path="/" component={Default} exact />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route
          path="/userAccount"
          component={lazy(() => import("./components/userAccount/Index"))}
          exact
        />
        <Route
          path="/userAccount/create"
          component={lazy(() => import("./components/userAccount/Create"))}
          exact
        />
        <Route
          path="/userAccount/:id/"
          component={lazy(() => import("./components/userAccount/Detail"))}
          exact
        />
        <Route
          path="/userAccount/edit/:id/"
          component={lazy(() => import("./components/userAccount/Edit"))}
          exact
        />
        <Route
          path="/userAccount/delete/:id/"
          component={lazy(() => import("./components/userAccount/Delete"))}
          exact
        />
        <Route
          path="/products"
          component={lazy(() => import("./components/products/Index"))}
          exact
        />
        <Route
          path="/products/create"
          component={lazy(() => import("./components/products/Create"))}
          exact
        />
        <Route
          path="/products/:productId/"
          component={lazy(() => import("./components/products/Detail"))}
          exact
        />
        <Route
          path="/products/edit/:productId/"
          component={lazy(() => import("./components/products/Edit"))}
          exact
        />
        <Route
          path="/products/delete/:productId/"
          component={lazy(() => import("./components/products/Delete"))}
          exact
        />
        <Route path="*" component={NotFound} />
      </Router>
    </Suspense>
  );
}
