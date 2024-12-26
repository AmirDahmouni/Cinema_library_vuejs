import { defineStore } from 'pinia';
import axios from 'axios';

interface ILanguage {
  id: string;
  name: string;
}

interface LanguagesState {
  pending: boolean;
  languages: ILanguage[];
  selectedLanguage: string | null;
  error: string | null;
}

export const useLanguagesStore = defineStore('languages', {
  state: (): LanguagesState => ({
    pending: false,
    languages: [],
    selectedLanguage: null,
    error: null,
  }),
  actions: {
    async fetchLanguages() {
      this.pending = true;
      this.error = null;

      try {
        const response = await axios.get<{ languages: ILanguage[] }>(
          `${process.env.VUE_APP_API_URL}/configuration/languages`,
          {
            headers: {
              Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`,
            },
          }
        );
        this.languages = response.data.languages;
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.pending = false;
      }
    },
    selectLanguageFilter(language: string | null) {
      this.selectedLanguage = language;
    },
  },
  getters: {
    getSelectedLanguage: (state) => state.selectedLanguage,
    getLanguages: (state) => state.languages,
  },
});
