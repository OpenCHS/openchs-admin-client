import React from "react";
/**
 *  AuthedRoute is a wrapper around react-router's Route component.
 *  It performs following checks before allowing access:
 *      1. Is user authenticated? If not, redirect to login URL
 *      2. Is user authorised?
 *          2.1 Is user Admin or OrgAdmin? Deny access otherwise.
 *          2.2 Does user have role privileges to access the route?
 *
 *  Role-based access is enabled via the optional {allowedRoles}
 *  prop. {allowedRoles} should be passed as an array.
 *  props={userInfo} should also be passed all times which should
 *  contain userInfo like user.isAuthenticated, isNonAdminUser,
 *  isAdmin and isOrgAdmin etc.
 *
 */
const AuthedRoute = ({ component: C, userInfo, allowedRoles, ...rest }) => (
  <Route
    {...rest}
    render={routerProps =>
      userInfo.isLoggedIn ? (
        userInfo.isNonAdminUser ? (
          UNAUTHORISED_USER_JSX
        ) : (
          checkRoutePrivilegesAndRender(allowedRoles, userInfo, C, routerProps)
        )
      ) : (
        <Redirect
          to={{ pathname: LOGIN_URL, state: { from: rest.location } }}
        />
      )
    }
  />
);

const checkRoutePrivilegesAndRender = (
  allowedRoles,
  userInfo,
  C,
  routerProps
) =>
  _.isEmpty(allowedRoles) || allowedRoles.includes(userInfo.role) ? (
    <C {...routerProps} />
  ) : (
    UNAUTHORISED_ROUTE_JSX
  );

export default AuthedRoute;
