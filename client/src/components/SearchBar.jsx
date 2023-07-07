import { useState } from "react";
import style from "../styles/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { resetPage, addChar } from "../redux/actions";
import axios from "axios";

export default function SearchBar({ onSearch }) {
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setId(event.target.value);
  };
  const add = () => {
    onSearch(id);
    dispatch(resetPage());
    setId("");
  };
  const randomChar = () => {
    const numRan = Math.floor(Math.random() * 825) + 1;
    axios(`http://localhost:5040/rickandmorty/character/${numRan}`).then(
      ({ data }) => {
        if (data.name) {
          dispatch(addChar(data));
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      }
    );
  };

  return (
    <div className={style.search}>
      <label>Insert ID: </label>
      <input
        type="search"
        onChange={handleChange}
        value={id}
        name="id"
        placeholder="insert id ..."
      />
      <button onClick={add}>Search</button>
      <button onClick={randomChar}>Random Character</button>
    </div>
  );
}
