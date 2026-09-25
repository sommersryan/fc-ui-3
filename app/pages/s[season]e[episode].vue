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
    <div class="md:h-full w-full md:w-sm flex flex-col">
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
        <div class="py-1 md:px-3 mb-3 md:mb-0 flex flex-row md:flex-col md:mt-2 gap-x-4 md:gap-x-0 md:gap-y-4 md:w-full overflow-x-auto md:overflow-y-auto md:max-h-[calc(100vh-var(--ui-header-height)-6rem)]">
          <div class="cursor-pointer bg-elevated flex flex-row min-w-[46%] md:w-full md:h-auto rounded-lg p-2 md:p-4 md:flex-col gap-y-3 items-center justify-center"
               v-for="caption in captions"
          >
              <div class="flex w-full items-center justify-center">
                <NuxtImg class="rounded-lg w-full" :src="`${config.public.frameBase}${caption.frames[0].uri}`"/>
              </div>
              <div class="hidden md:flex text-sm text-primary dark:text-secondary font-semibold text-center" v-html="caption.content"></div>
          </div>
        </div>
    </div>
    <div class="grow">
      <NuxtPage :frame-uri="'test'"/>
    </div>
  </UContainer>
</template>

<style scoped>

</style>
