import React, { useCallback, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/LayOut/Header";
import "./App.css";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Thread from "./pages/Thread";
import CreateReply from "./pages/CreateReply";
import CreateThread from "./pages/CreateThread";
import { AuthContext } from "./context/auth-context";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const login = useCallback((username, uid, token) => {
    setToken(token);
    setUserId(uid);
    setUsername(username);
    console.log(`user ${username} with ${uid} is logged in  ${!!token}`);
  }, []);

  const logout = useCallback((uid) => {
    setToken(null);
    setUserId(null);
    setUsername(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        username: username,
        userId: userId,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact>
              <MainPage />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/threads/:id">
              <Thread />
            </Route>
            <Route path="/createreply/:id" exact>
              <CreateReply />
            </Route>
            <Route path="/createthread" exact>
              <CreateThread />
            </Route>
          </Switch>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
