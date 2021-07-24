import { useEffect, useState } from "react";
//import { getCharactersRickAndMorty } from "../../services/RickAndMortyService";
import {
  getCharactersMarvel,
  getCharacterByName,
} from "../../services/MarvelService";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HomeLoader from "../../components/Loader/HomeLoader";

const Home = () => {
  const [result, setResult] = useState("");
  const [filtered, setFilterd] = useState({
    loading: true,
    prev: null,
    next: null,
    characters: [],
  });

  const [dataMarvel, setDataMarvel] = useState({
    loading: true,
    prev: null,
    next: null,
    characters: [],
  });

  const getCharacters = async (url) => {
    setDataMarvel({
      loading: true,
    });
    const { characters, offset, prev, next } = await getCharactersMarvel(url);
    setDataMarvel({
      loading: false,
      prev,
      next,
      characters,
      offset,
    });
    setFilterd({
      loading: false,
      prev,
      next,
      characters,
      offset,
    });
  };

  //Consulta a la API por título.
  const onSearchCharacter = async (name) => {
    setDataMarvel({
      loading: true,
    });
    const { characters, offset, prev, next } = await getCharacterByName(name);
    setDataMarvel({
      loading: false,
      prev,
      next,
      characters,
      offset,
    });
    setFilterd({
      loading: false,
      prev,
      next,
      characters,
      offset,
    });
  };

  const handleChange = (e) => {
    setResult(e.target.value);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    const results = filtered.characters.filter((res) =>
      res.title.toLowerCase().includes(result.toLowerCase())
    );
    setDataMarvel({ ...dataMarvel, characters: results });
  }, [result]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Home</h1>
      </div>
      {dataMarvel.loading ? (
        <HomeLoader />
      ) : (
        <>
          <div className="row">
            <form /* onSubmit={addTask} */>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filtro onChange y Consulta a API por personaje, ej. cyclops, deadpool"
                  onChange={handleChange}
                  value={result}
                  name="search"
                />
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  disabled={(result === undefined, result === "")}
                  onClick={() => onSearchCharacter(result)}
                >
                  Consultar API
                </button>
              </div>
            </form>
            <div className="col mb-3">
              <button
                className="btn btn-primary float-start"
                type="button"
                style={{ marginLeft: "-10px" }}
                disabled={dataMarvel.offset === 0}
                onClick={() => getCharacters(dataMarvel.prev)}
              >
                <FaChevronLeft />
              </button>
              <button
                className="btn btn-primary float-end"
                type="button"
                disabled={dataMarvel.next === null}
                onClick={() => getCharacters(dataMarvel.next)}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
          <div className="row row-cols-md-2">
            {dataMarvel.characters.map((character) => {
              return (
                <div
                  key={character.id}
                  className="card mb-3"
                  style={{ marginRight: "10px", width: "400px" }}
                >
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        style={{ marginLeft: "-12px" }}
                        src={
                          character.thumbnail.path +
                          "." +
                          character.thumbnail.extension
                        }
                        alt="character"
                        className="bd-placeholder-img"
                        height="230"
                        width="150"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {character.title.substr(0, 40)}
                        </h5>
                        <p className="card-text">
                          {character.creators.items[0]?.name}
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            {
                              (character.description !== "",
                              character.description !== null
                                ? character.description.substr(0, 50) + "..."
                                : "No description")
                            }
                          </small>
                        </p>
                        <p className="card-text">{character.format}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
