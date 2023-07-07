import {
  RESET_PAGE,
  RESET_CHARACTERS,
  ADD_FAV,
  REMOVE_FAV,
  ADD_CHAR,
  REMOVE_CHAR,
  FILTER,
  RESET,
  FILTER_A_Z,
  PREV,
  NEXT,
  CREATE_CHAR,
  SEARCH_CHAR,
} from "./actionType";
import axios from "axios";

export function searchChar(char) {
  return {
    type: SEARCH_CHAR,
    payload: char,
  };
}

export function addChar(char) {

  return {
    type: ADD_CHAR,
    payload: char,
  };
}

export function resetPage() {
  return {
    type: RESET_PAGE,
  };
}
export function resetCharacters() {
  return {
    type: RESET_CHARACTERS,
  };
}
export function removeChar(id) {
  return {
    type: REMOVE_CHAR,
    payload: id,
  };
}

export function addFav(char) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(
        `http://localhost:5040/rickandmorty/fav`,
        char
      );
      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function removeFav(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.delete(
        `http://localhost:5040/rickandmorty/fav/${id}`
      );
      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterGender(gender) {
  return {
    type: FILTER,
    payload: gender,
  };
}
export function filterAtoZ(aOz) {
  return {
    type: FILTER_A_Z,
    payload: aOz,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export function prev() {
  return {
    type: PREV,
  };
}
export function next() {
  return {
    type: NEXT,
  };
}

export function createCharacter(character) {
  character.id = Number(character.id);
  return {
    type: CREATE_CHAR,
    payload: character,
  };
}

