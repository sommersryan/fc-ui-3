<script setup lang="js">
  const route = useRoute()

  const panels = computed(() => [
    {
      slot: 'left',
      minSize: 25,
      defaultSize: 25
    },
    {
      slot: 'right',
      minSize: 75
    }
  ])
</script>

<template>
<!--hi! {{$route.params.season}} {{$route.params.episode}} {{ $route.params.captionId }}-->

<!--  {{route.query['frameTimestamp']}}-->
  <UContainer class="py-8">
    <USplitter :items="panels">
      <template #left>
        hi
      </template>
      <template #right>
        hi
      </template>
    </USplitter>
  </UContainer>
</template>

<style scoped>

</style>
