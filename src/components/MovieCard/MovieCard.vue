<template>
  <Card borderRadius="10" overflow="hidden">
    <Image
      :src="croppedImageUrl"
      width="auto"
      height="220"
      :alt="`cover ${movie.original_title}`"
    />
    <CardBody>
      <HStack justifyContent="space-between">
        <Score :score="movie.vote_average" />
        <MdNoAdultContent v-if="movie.adult" font-size="30" />
        <ReactCountryFlag
          :countryCode="movie.original_language"
          svg
          style="font-size: 1.5em;"
        />
      </HStack>
      <HStack justifyContent="space-between" marginBottom="2" marginTop="4">
        <Badge margin="1" padding="1" borderRadius="5" textAlign="right">
          {{ movie.release_date || movie.first_air_date }}
        </Badge>
        <Views :views="movie.popularity" />
        <RatingReviews :score="movie.vote_count" />
      </HStack>
      <GenresMovie :genresMovies="movie.genre_ids" />
      <Heading fontSize="1xl">{{ movie.title || movie.name }}</Heading>
      <Box marginTop="1">
        <ExpandableText>{{ movie.overview }}</ExpandableText>
      </Box>
    </CardBody>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import {
  Card,
  Image,
  CardBody,
  Heading,
  HStack,
  Box,
  Badge,
  Icon,
} from '@chakra-ui/vue-next'
import ReactCountryFlag from 'react-country-flag'
import { MdNoAdultContent } from 'react-icons/md'
import Score from './Score'
import ExpandableText from './ExpandableText'
import RatingReviews from './RatingReviews'
import Views from './Views'
import GenresMovie from './GenresMovie'
import getCroppedImageUrl from '../../services/image-url'

// Props
defineProps({
  movie: {
    type: Object,
    required: true,
  },
  key: {
    type: Number,
    required: true,
  },
})

// Computed property for cropped image URL
const croppedImageUrl = computed(() => {
  return getCroppedImageUrl(
    props.movie.backdrop_path || props.movie.poster_path,
  ).toString()
})
</script>

<style scoped>
/* Add custom styles if needed */
</style>
