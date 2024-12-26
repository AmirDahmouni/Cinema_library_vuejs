<template>
  <HStack>
    <RatingButton v-for="i in score" :key="i" :idx="i" :fill="i <= score" />
  </HStack>
</template>

<script setup>
import { HStack, Box, Icon } from '@chakra-ui/vue-next';
import { AiTwotoneStar } from 'react-icons/ai';

// Props
defineProps({
  score: {
    type: Number,
    required: true,
  },
});

// RatingIcon component
const RatingIcon = ({ fill }) => {
  return (
    <Icon
      as={AiTwotoneStar}
      name="StarIcon"
      color="gold"
      stroke="grey"
      :fillOpacity="fill ? '100%' : '0%'"
    />
  );
};

// RatingButton component
const RatingButton = ({ idx, fill }) => {
  return (
    <Box
      as="button"
      :aria-label="`Rate ${idx}`"
      height="14px"
      width="7px"
      mx="1"
      fontSize="22px"
      _focus={{ outline: 0 }}
    >
      <RatingIcon :fill="fill" />
    </Box>
  );
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
