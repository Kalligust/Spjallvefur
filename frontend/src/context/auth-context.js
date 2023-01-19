import React from "react";

const AuthContext = React.createContext({
  username: "",
  userId: "",
  token: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

// isLoggedIn: !!token,
//         username: username,
//         userId: userId,
//         token: token,
//         login: login,
//         logout: logout,
//       }}
