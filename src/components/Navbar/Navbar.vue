<template>
  <HStack justifyContent="space-between" padding="10px">
    <Image :src="logo" width="50" height="50" alt="logo" />
    <SearchInput @search="search" />
    <GenreSelector />
    <SortSelector />
    <LanguagesSelector />
    <Button
      size="xs"
      marginLeft="1"
      fontWeight="light"
      colorScheme="blue"
      padding="4"
      @click="reset"
    >
      <Text fontSize="18" fontWeight="medium">
        Reset
      </Text>
    </Button>
    <ColorModeSwitch />
  </HStack>
</template>

<script setup>
import { ref, useDispatch, computed, useCallback } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { useGenresStore } from '@/stores/genres'
import { useLanguagesStore } from '@/stores/languages'
import { Button, HStack, Image, Text } from '@chakra-ui/vue-next'
import SearchInput from './SearchInput.vue'
import GenreSelector from './GenreSelector.vue'
import SortSelector from './SortSelector.vue'
import LanguagesSelector from './LanguagesSelector.vue'
import ColorModeSwitch from './ColorModeSwitch.vue'
import logo from '../../assets/logo.webp'

const moviesStore = useMoviesStore()
const genresStore = useGenresStore()
const languagesStore = useLanguagesStore()

const filters = computed(() => moviesStore.filters)

const search = (text) => {
  moviesStore.updateMoviesFilters('searchText', text)
  moviesStore.fetchMoviesRequest(filters.value)
}

const reset = useCallback(() => {
  moviesStore.updateMoviesFilters('genreId', null)
  moviesStore.updateMoviesFilters('searchText', null)
  moviesStore.updateMoviesFilters('language', null)
  moviesStore.updateMoviesFilters('sortOrder', null)
  moviesStore.updateMoviesFilters('pageParam', null)
  genresStore.selectGenreFilter(null)
  languagesStore.selectLanguageFilter(null)
  moviesStore.fetchMoviesRequest(filters.value)
}, [])
</script>

<style scoped>
/* Add custom styles if needed */
</style>
