import axios from "axios";

/* const API_URL =
  "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a17614b05d473070a5ede590817bc1c1&hash=e332370952b821f43ba2e0331c14e29b&limit=20&offset="; */

const BASE_PATH = "https://gateway.marvel.com:443/v1/public/comics?title=";
const DEFAULT_CHARACTER = "wolverine";
const URL_PARAMS =
  "&ts=1&apikey=a17614b05d473070a5ede590817bc1c1&hash=e332370952b821f43ba2e0331c14e29b&limit=15&offset=";

const getCharactersMarvel = async (
  url = BASE_PATH + DEFAULT_CHARACTER + URL_PARAMS + "0"
) => {
  const responseCharacters = await axios.get(url);
  const dataCharacters = responseCharacters.data.data;
  const characters = dataCharacters.results;
  const offset = dataCharacters.offset;
  const prev = `${BASE_PATH}${DEFAULT_CHARACTER}${URL_PARAMS}${offset - 15}`;
  const next = `${BASE_PATH}${DEFAULT_CHARACTER}${URL_PARAMS}${offset + 15}`;
  return { characters, offset, prev, next };
};

const getCharacterByName = async (name) => {
  const responseCharacters = await axios.get(
    BASE_PATH + name + URL_PARAMS + "0"
  );
  const dataCharacters = responseCharacters.data.data;
  const characters = dataCharacters.results;
  const offset = dataCharacters.offset;
  const prev = `${BASE_PATH}${name}${URL_PARAMS}${offset - 15}`;
  const next = `${BASE_PATH}${name}${URL_PARAMS}${offset + 15}`;

  return { characters, offset, prev, next };
};

export { getCharactersMarvel, getCharacterByName };
