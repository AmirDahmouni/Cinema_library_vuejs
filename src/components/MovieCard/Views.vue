<template>
  <HStack alignContent="revert-layer">
    <Badge fontSize="14px" borderRadius="4px" colorScheme="gray">
      {{ views }}
    </Badge>
    <Icon as="AiOutlineEye" color="gray.500" fontSize="20px" />
  </HStack>
</template>

<script setup>
import { HStack, Badge, Icon } from '@chakra-ui/vue-next'
import { AiOutlineEye } from 'react-icons/ai'

// Props
defineProps({
  views: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped>
/* Add custom styles if needed */
</style>
