import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Details from "./components/Details";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
