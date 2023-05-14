import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Login from "./components/auth/Login.jsx";
import Home from "./components/home/Home.jsx";
import Register from "./components/auth/Register.jsx";
import Ad from "./components/item/Ad.jsx";
import AdForm from "./components/item/AdForm.jsx";
import Nav from "./components/utils/Nav.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Admin from "./components/admin-panel/Admin.jsx";
// Actions
import { loadUser } from "./actions/auth";
// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  // Load user
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ads/:adId" element={<Ad />} />
          <Route path="/postad" element={<AdForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
