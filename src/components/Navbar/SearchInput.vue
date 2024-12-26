<template>
  <form @submit.prevent="handleSubmit" style="width: 50%;">
    <InputGroup>
      <InputLeftElement>
        <BsSearch />
      </InputLeftElement>
      <Input
        v-model="searchText"
        borderRadius="20"
        placeholder="Search movies..."
        variant="filled"
      />
    </InputGroup>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/vue-next'
import { BsSearch } from 'react-icons/bs'

const searchText = ref('')

const handleSubmit = () => {
  if (searchText.value) {
    // Call the parent onSearch method (you can pass the searchText to the parent)
    // You will need to emit an event or use a prop for this functionality
    emit('search', searchText.value)
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
