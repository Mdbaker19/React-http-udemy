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
      const res = await fetch("https://react-http-movie-udemy-default-rtdb.firebaseio.com/movies.json", {});
      // const res = await fetch("https://swapi.dev/api/films/", {});

      if (!res.ok) {
        throw new Error("Something went wrong"); // swapi does not handle the errors the same way
      }

      const data = await res.json();

      const loadedMovies = [];

      for(const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }

      setMovies(loadedMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect( () => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  const addMovieHandler = async (movie) => {
    const res = await fetch("https://react-http-movie-udemy-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
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
