<template>
  <HStack marginBottom="2">
    <Badge
      v-for="genreId in genresMovies"
      :key="genreId"
      fontSize="15px"
      borderRadius="5px"
      colorScheme="purple"
    >
      {{ getGenreName(genreId) }}
    </Badge>
  </HStack>
</template>

<script setup>
import { computed } from 'vue'
import { HStack, Badge } from '@chakra-ui/vue-next'
import { useStore } from 'vuex'

// Get genres and genresMovies from Vuex store
const store = useStore()
const genres = computed(() => store.state.genresState.genres)
const genresMovies = computed(() => store.state.genresState.genresMovies)

// Helper function to get genre name by id
const getGenreName = (genreId) => {
  const genre = genres.value.find((genre) => genre.id === genreId)
  return genre ? genre.name : ''
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
