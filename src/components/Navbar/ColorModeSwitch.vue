<template>
  <HStack justifyContent="space-between">
    <Switch
      colorScheme="green"
      :isChecked="colorMode === 'dark'"
      @change="toggleColorMode"
    />
    <Text whiteSpace="nowrap">Dark Mode</Text>
  </HStack>
</template>

<script setup>
import { ref } from 'vue'
import { useColorMode } from '@chakra-ui/vue-next'
import { HStack, Switch, Text } from '@chakra-ui/vue-next'

const { colorMode, toggleColorMode } = useColorMode()
</script>

<style scoped>
/* Add custom styles if needed */
</style>
