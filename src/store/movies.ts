import { defineStore } from 'pinia';
import axios from 'axios';

interface IMovie {
  id: number;
  title: string;
  genre: string;
  // Add other movie properties here
}

interface Filter {
  key: string;
  value: string | number | null;
}

interface MoviesState {
  pending: boolean;
  movies: IMovie[];
  filters: Filter[];
  selectedMovie: IMovie | null;
  error: string | null;
  nbPages: number | null;
}

export const useMoviesStore = defineStore('movies', {
  state: (): MoviesState => ({
    pending: false,
    movies: [],
    filters: [
      { key: 'genreId', value: null },
      { key: 'language', value: null },
      { key: 'sortOrder', value: null },
      { key: 'searchText', value: null },
      { key: 'pageParam', value: 1 },
    ],
    selectedMovie: null,
    error: null,
    nbPages: null,
  }),

  actions: {
    async fetchMovies() {
      this.pending = true;
      this.error = null;

      try {
        const filters = this.filters.reduce((acc: any, { key, value }) => {
          acc[key] = value;
          return acc;
        }, {});
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/discover/movie`, {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            with_genres: filters.genreId,
            with_original_language: filters.language,
            sort_by: filters.sortOrder,
            with_keywords: filters.searchText,
            page: filters.pageParam,
          },
        });

        this.movies = response.data.results;
        this.nbPages = Math.ceil(response.data.total_pages / 20);
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.pending = false;
      }
    },

    async fetchMovie(slug: string) {
      this.pending = true;
      this.error = null;

      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/movie/${slug}`, {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`,
          },
        });
        this.selectedMovie = response.data;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.pending = false;
      }
    },

    updateFilters(filter: string, value: string | number | null) {
      const existingFilterIndex = this.filters.findIndex((f) => f.key === filter);
      if (existingFilterIndex !== -1) {
        this.filters[existingFilterIndex].value = value;
      } else {
        this.filters.push({ key: filter, value });
      }
    },
  },

  getters: {
    getMovies: (state) => state.movies,
    getSelectedMovie: (state) => state.selectedMovie,
    getFilters: (state) => state.filters,
  },
});
