const axios = require("axios");

const URL = " https://rickandmortyapi.com/api/character";
const STATUS_OK = 200;
const STATUS_ERROR = 500;

const EMAIL_USER = "eje@gmail.com";
const PASSWORD_USER = "@123QWEasd";

const login = function (req, res) {
  const { password, email } = req.query;
  if (!password || !email) {
    return res.status(STATUS_ERROR).json({ access: false });
  }
  if (password === PASSWORD_USER && email === EMAIL_USER) {
    res.status(STATUS_OK).json({ access: true });
  } else {
    res.status(STATUS_OK).json({ access: false });
  }
};

const getCharacterId = async function (req, res) {
  try {
    const { id } = req.params;
    const ch = await axios.get(`${URL}/${id}`);
    const { name, gender, species, origin, image, status } = ch.data;
    const character = {
      id: Number(id),
      name,
      gender,
      species,
      origin,
      image,
      status,
    };
    res.status(STATUS_OK).json(character);
  } catch (error) {
    res.status(STATUS_ERROR).end(error.message);
  }
};

const getAllCharacters = async function (req, res) {
  try {
    const characters = await axios.get(`${URL}?page=1`);
    res.status(STATUS_OK).json(characters.data.results);
  } catch (error) {
    //TODO: TESTING <-> fix error to -> .end(error.message)
    res.status(STATUS_ERROR).end(error.message);
  }
};

module.exports = {
  getCharacterId,
  login,
  getAllCharacters,
};

