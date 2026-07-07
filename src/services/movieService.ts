import axios from "axios";
const myKey = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(query: string) {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    },
  );

  return data.results;
}
