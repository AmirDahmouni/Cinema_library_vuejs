<template>
  <Card width="300px" borderRadius="10" overflow="hidden">
    <Skeleton height="200px" />
    <CardBody>
      <SkeletonText />
    </CardBody>
  </Card>
</template>

<script setup>
import { Card, Skeleton, SkeletonText, CardBody } from '@chakra-ui/vue-next'
</script>

<style scoped>
/* Add custom styles if needed */
</style>
