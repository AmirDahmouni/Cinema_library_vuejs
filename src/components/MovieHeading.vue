<template>
  <Heading v-if="movies.length === 0" as="h1" color="red.300" margin="5">
    Oops : No Movies found!
  </Heading>
  <Heading v-else-if="language || genre" as="h1" marginY="5">
    {{ `${language || ''} ${genre || ''} Movies` }}
  </Heading>
  <Heading v-else as="h1" marginY="5">
    All Movies
  </Heading>
</template>

<script setup>
import { useMoviesStore } from '@/stores/movies'
import { ref, computed } from 'vue'
import { Heading } from '@chakra-ui/vue-next'

const moviesStore = useMoviesStore()

// Getting selected genre, language, and movies from Pinia store
const genre = computed(() => moviesStore.selectedGenre)
const language = computed(() => moviesStore.selectedLanguage)
const movies = computed(() => moviesStore.movies)
</script>

<style scoped>
/* Add your custom styles if necessary */
</style>
