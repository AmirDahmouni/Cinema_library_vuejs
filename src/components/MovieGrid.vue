<template>
  <div>
    <Text v-if="error">{{ error }}</Text>

    <SimpleGrid
      :columns="{ sm: 1, md: 2, lg: 3, xl: 4 }"
      spacing="6"
      margin="10px"
    >
      <!-- Skeleton loaders while loading -->
      <MovieCardContainer
        v-for="skeleton in skeletons"
        :key="skeleton"
        v-if="isLoading"
      >
        <MovieCardSkeleton />
      </MovieCardContainer>

      <!-- Render movie cards -->
      <MovieCardContainer v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </MovieCardContainer>
    </SimpleGrid>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { Text, SimpleGrid } from '@chakra-ui/vue-next'
import MovieCard from './MovieCard/MovieCard'
import MovieCardSkeleton from './MovieCardSkeleton'
import MovieCardContainer from './MovieCardContainer'

const moviesStore = useMoviesStore()

const filters = computed(() => moviesStore.filters)
const movies = computed(() => moviesStore.movies)
const isLoading = computed(() => moviesStore.isLoading)
const error = computed(() => moviesStore.error)

// Skeletons array for displaying loading states
const skeletons = [1, 2, 3, 4, 5, 6]

onMounted(() => {
  moviesStore.fetchMoviesRequest(filters.value)
})
</script>

<style scoped>
/* Custom styles (if any) */
</style>
