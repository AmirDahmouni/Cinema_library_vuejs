<template>
  <Menu>
    <MenuButton as="Button" rightIcon="BsChevronDown">
      {{ currentGenre?.name || 'All Genres' }}
    </MenuButton>
    <MenuList>
      <MenuItem
        v-for="genre in genres"
        :key="genre.id"
        @click="onSelectedPlatform(genre)"
      >
        {{ genre.name }}
      </MenuItem>
    </MenuList>
  </Menu>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useGenresStore } from '@/stores/genres';
import { useMoviesStore } from '@/stores/movies';
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/vue-next';
import { BsChevronDown } from 'react-icons/bs';

const genresStore = useGenresStore();
const moviesStore = useMoviesStore();

const selectedGenre = ref<string | undefined>();

const genres = computed(() => genresStore.genres);
const filters = computed(() => moviesStore.filters);

const currentGenre = computed(() =>
  genres.value.find((genre) => genre.name === selectedGenre.value)
);

const onSelectedPlatform = (genre) => {
  selectedGenre.value = genre.name;
  genresStore.selectGenreFilter(genre.name);
  moviesStore.updateMoviesFilters('genreId', genre.id);
  moviesStore.fetchMoviesRequest(filters.value);
};

onMounted(() => {
  genresStore.fetchGenresRequest();
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
