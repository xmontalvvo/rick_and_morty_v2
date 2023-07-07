import { useEffect, useState } from "react";
import "./App.css";

import Cards from "./components/Cards.jsx";
import NavBar from "./components/NavBar";
import axios from "axios";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import About from "./components/About";
import Detail from "./components/Detail";
import ErrorNotFound from "./components/ErrorNotFound";
import Favorites from "./components/Favorites";

import { connect, useDispatch, useSelector } from "react-redux";
import {
  addFav,
  removeFav,
  searchChar,
  removeChar,
  addChar,
} from "./redux/actions";
import CreateCharacter from "./components/CreateCharacter";

export default function App() {
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  // const EMAIL = "eje@gmail.com";
  // const PASSWORD = "@123QWEasd";

  const dispatch = useDispatch();
  const URL = "http://localhost:5040/rickandmorty";

  async function login(inputs) {
    try {
      const { data } = await axios.get(
        `${URL}/login?password=${inputs.password}&email=${inputs.email}`
      );
      if (data.access) {
        setAccess(true);
        navigate("/home");
        return alert("bienvenidos!!!");
      } else {
        return alert("no es el usuario");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      const { data } = await axios.get(`${URL}/login?password=1234&email=1234`);
      if (!data.access) {
        // setAccess(false);
        // navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { characters } = useSelector((state) => state);

  async function onSearch(id) {
    try {
      const { data } = await axios(
        `http://localhost:5040/rickandmorty/character/${id}`
      );
      if (data.name) {
        dispatch(searchChar(data));
      } else {
        window.alert("¡No hay personajes con este ID!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onClose(id) {
    dispatch(removeChar(Number(id)));
    dispatch(removeFav(Number(id)));
  }

  const { pathname } = useLocation();

  useEffect(() => {
    async function inEffect() {
      try {
        const { data } = await axios.get(
          `http://localhost:5040/rickandmorty/allcharacters`
        );
        dispatch(addChar(data));
      } catch (error) {
        console.log(error);
      }
    }
    inEffect();
  }, []);

  useEffect(() => {
    dispatch(addFav({ id: "RELOAD" }));
  }, []);

  return (
    <>
      {pathname === "/" ? null : <NavBar logout={logout} onSearch={onSearch} />}

      <Routes>
        <Route path="/" element={<Login login={login} />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home" element={<Cards onClose={onClose} />}></Route>
        <Route path="/favorites" element={<Favorites onClose={onClose} />}></Route>
        <Route path="/create" element={<CreateCharacter />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="*" element={<ErrorNotFound />}></Route>
      </Routes>
    </>
  );
}
