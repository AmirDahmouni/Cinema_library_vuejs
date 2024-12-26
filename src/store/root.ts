import { useMoviesStore } from './movies';
import { useGenresStore } from './genres';
import { useLanguagesStore } from './languages';

export const useAppStore = () => {
  const moviesStore = useMoviesStore();
  const genresStore = useGenresStore();
  const languagesStore = useLanguagesStore();

  const fetchAllData = async () => {
    await Promise.all([genresStore.fetchGenres(), languagesStore.fetchLanguages()]);
    await moviesStore.fetchMovies();
  };

  return { fetchAllData };
};
