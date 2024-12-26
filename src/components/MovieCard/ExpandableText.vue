<template>
  <Box>
    <Text>
      {{ summary }}
    </Text>
    <Button
      size="xs"
      marginTop="2"
      fontWeight="bold"
      colorScheme="yellow"
      @click="toggleExpand"
    >
      {{ expanded ? 'Show Less' : 'Read More' }}
    </Button>
  </Box>
</template>

<script setup>
import { ref } from 'vue'
import { Box, Button, Text } from '@chakra-ui/vue-next'

const props = defineProps({
  children: {
    type: String,
    required: true,
  },
})

const expanded = ref(false)
const limit = 50

const toggleExpand = () => {
  expanded.value = !expanded.value
}

const summary = computed(() => {
  if (!props.children) return ''
  return props.children.length <= limit
    ? props.children
    : expanded.value
    ? props.children
    : props.children.substring(0, limit) + '...'
})
</script>

<style scoped>
/* Add custom styles if needed */
</style>
