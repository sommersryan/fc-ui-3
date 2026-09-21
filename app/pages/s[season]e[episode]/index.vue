<script setup lang="js">
  defineProps({
    frameUri: String
  })
</script>

<template>
  <UCard class="w-full py-2 rounded-lg h-full">
    <template #header>
      {{ frameUri }} hi
    </template>
  </UCard>
</template>

<style scoped>

</style>
