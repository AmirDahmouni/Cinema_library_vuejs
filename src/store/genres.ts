import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import "core-js/stable";

interface Genre {
  id: number;
  name: string;
}

interface GenresState {
  pending: boolean;
  genres: Genre[];
  selectedGenre: string | null;
  error: string | null;
}

export const useGenresStore = defineStore("genres", {
  state: (): GenresState => ({
    pending: false,
    genres: [],
    selectedGenre: null,
    error: null,
  }),
  actions: {
    async fetchGenres() {
      this.pending = true;
      this.error = null;
      try {
        const response = await axios.get(`${process.env.VITE_URL_API}/genre/tv/list`, {
          headers: {
            Authorization: `Bearer ${process.env.VITE_KEY_API}`,
          },
        });
        this.genres = response.data.genres;
      } catch (error) {
        const axiosError = error as AxiosError;
        this.error = axiosError.message;
      } finally {
        this.pending = false;
      }
    },
    selectGenreFilter(genre: string | null) {
      this.selectedGenre = genre;
    },
  },
});
