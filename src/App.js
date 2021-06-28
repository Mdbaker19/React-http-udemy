import { useState, useEffect, useCallback } from "react";

import './App.css';
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://swapi.dev/api/films/", {});

      if (!res.ok) {
        throw new Error("Something went wrong"); // swapi does not handle the errors the same way
      }

      const data = await res.json();

      const parsedData = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      });
      setMovies(parsedData);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect( () => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  const addMovieHandler = (movie) => {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>

  if(movies.length > 0) content = <MovieList movies={movies} />

  if(error) content = <p>{error}</p>

  if(isLoading) content = <p>Loading...</p>

  return (
    <div className="App">
      <AddMovie onAddMovie={addMovieHandler} />
      <button onClick={fetchMovieHandler}>Fetch Data</button>
      {content}
    </div>
  );
};

export default App;
