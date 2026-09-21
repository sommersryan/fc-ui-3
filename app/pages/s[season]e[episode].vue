<script setup lang="ts">
  const route = useRoute()

  const frameTimestamp = ref(route.query.frameTimestamp)

  const config = useRuntimeConfig()

  const { captions, fetchCaptions, loading } = useFrameBrowse()

  const onCaptionFetch = async (season, episode, index) => {
    await fetchCaptions(season, episode, index)
  }

  onCaptionFetch(route.params.season, route.params.episode, route.query.captionIndex ?? 0 )
</script>

<template>
  <UContainer class="flex flex-col md:flex-row gap-x-4 py-4 w-full max-h-[calc(100vh-var(--ui-header-height))]">
    <UCard :ui="{
      root: '!max-h-[calc(100vh-var(--ui-header-height))]',
      header: 'py-0.5',
      body: 'p-2 sm:p-2 max-h-full overflow-y-auto'
    }" variant="subtle" class="w-full p-2 rounded-lg md:w-sm">
      <template #header>
        <div class="flex gap-x-4 mb-1">
          <div class="justify-center w-full flex gap-x-2 items-center" v-for="{ label, text } in [
          { label: 'Season', text: $route.params.season },
          { label: 'Episode', text: $route.params.episode }
        ]">
            <div class="text-sm text-muted uppercase">
              {{ label }}
            </div>
            <div class="text-secondary font-bold text-xl">
              {{ text }}
            </div>
          </div>
        </div>
        <USeparator size="sm" :ui="{ icon: 'text-secondary'}" icon="fluent-mdl2:video-search" color="secondary"/>
      </template>
      <template #default>
        <UScrollArea shadow orientation="vertical" :items="captions" v-slot="{ item: caption }">
          <UCard variant="outline" :ui="{ root: 'cursor-pointer', footer: 'py-2'}">
            <template #default>
              <div class="flex w-full items-center justify-center">
                <NuxtImg class="rounded-lg" :src="`${config.public.frameBase}${caption.frames[0].uri}`"/>
              </div>
            </template>
            <template #footer>
              <span class="text-sm text-secondary font-bold">{{ caption.content }}</span>
            </template>
          </UCard>
        </UScrollArea>
      </template>
    </UCard>
    <div class="grow">
      <NuxtPage :frame-uri="'test'"/>
    </div>
  </UContainer>
</template>

<style scoped>

</style>
