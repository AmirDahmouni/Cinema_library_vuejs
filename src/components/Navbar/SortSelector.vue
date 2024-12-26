<template>
  <Menu>
    <MenuButton as="Button" rightIcon="BsChevronDown">
      {{ currentSortOrder?.label || 'Sort by' }}
    </MenuButton>
    <MenuList>
      <MenuItem
        v-for="order in sortOrders"
        :key="order.label"
        @click="onSelectOrder(order.value)"
      >
        {{ order.label }}
      </MenuItem>
    </MenuList>
  </Menu>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from '@chakra-ui/vue-next'
import { BsChevronDown } from 'react-icons/bs'

const moviesStore = useMoviesStore()

const sortOrders = [
  { value: '', label: 'Relevance' },
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'primary_release_date.desc', label: 'Release date' },
  { value: 'revenue.desc', label: 'Revenue' },
  { value: 'vote_average.desc', label: 'Average rating' },
]

const sortOrder = (ref < string) | (undefined > '')

const filters = computed(() => moviesStore.filters)

const currentSortOrder = computed(() =>
  sortOrders.find((order) => order.value === sortOrder.value),
)

const onSelectOrder = (filterValue: string) => {
  sortOrder.value = filterValue
  moviesStore.updateMoviesFilters('sortOrder', filterValue)
  moviesStore.fetchMoviesRequest(filters.value)
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
