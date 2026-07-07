import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<boolean>(false);


  const closeModal = () => setSelected(null);

  async function handleSearch(query: string) {
    setLoader(true);
    setErrorText(false);
    try {
      const result = await fetchMovies(query);
      setMovies(result);
      if (result.length === 0) {
        setErrorText(true)
      }
    } catch {
      toast.error("No movies found for your request.");
      setErrorText(true);
    } finally {
      setLoader(false);
    }
  }

  function handleSelect(movie: Movie) {
    setSelected(movie);
  }
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {loader && <Loader />}
      {errorText && <ErrorMessage />}
      <MovieGrid onSelect={handleSelect} movies={movies} />
      {selected && <MovieModal onClose={closeModal} movie={selected} />}
    </>
  );
}
