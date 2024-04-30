import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Details from "./components/Details";
import AuthWrapper from "./components/AuthWrapper";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={
            <AuthWrapper formType="login">
              <SignIn />
            </AuthWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthWrapper formType="signup">
              <SignUp />
            </AuthWrapper>
          }
        />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
