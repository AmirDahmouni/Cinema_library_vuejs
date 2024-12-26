<template>
  <Menu>
    <MenuButton as="Button" :rightIcon="chevronDown">
      {{ currentLanguage?.english_name || 'Languages' }}
    </MenuButton>
    <MenuList>
      <MenuItem
        v-for="language in languages"
        :key="language.english_name"
        @click="onSelectLanguage(language)"
      >
        {{ language.english_name }}
      </MenuItem>
    </MenuList>
  </Menu>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDispatch } from 'pinia';
import { useLanguagesStore } from '@/stores/languages';
import { useMoviesStore } from '@/stores/movies';
import { ILanguage } from "@/entities/Language";
import { BsChevronDown } from 'react-icons/bs';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/vue-next';

const dispatch = useDispatch();
const languagesStore = useLanguagesStore();
const moviesStore = useMoviesStore();

const filters = computed(() => moviesStore.filters);
const languages = computed(() => languagesStore.languages);

const selectedLanguage = ref<string>();

onMounted(() => {
  dispatch('fetchLanguagesRequest');
});

const onSelectLanguage = (language: ILanguage) => {
  selectedLanguage.value = language.english_name;
  dispatch('selectLanguageFilter', language.english_name);
  dispatch('updateMoviesFilters', { key: 'language', value: language.iso_639_1 });
  dispatch('fetchMoviesRequest', filters.value);
};

const currentLanguage = computed(() =>
  languages.value.find((language: ILanguage) => language.english_name === selectedLanguage.value)
);
</script>

<style scoped>
/* Add custom styles if needed */
</style>
