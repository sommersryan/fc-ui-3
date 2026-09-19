<script setup lang="js">
  import {useCaptionSearch} from "~/composables/useCaptionSearch.js";
  import { watchDebounced, useSessionStorage } from '@vueuse/core'

  const { results, loading, searchCaptions } = useCaptionSearch()
  const config = useRuntimeConfig()

  const query = useSessionStorage(ref('fc-search'), null)

  const { isMobile, isTablet } = useDevice()

  const maxFramesIndex = computed(() => isMobile ? 1 : isTablet ? 2 : 3)

  const router = useRouter()

  const onFrameClick = (result, frameTimestamp) => {
    router.push(`/s${result.season}e${result.episode}/caption/${result.index}?frameTimestamp=${frameTimestamp}`)
  }

  const onQuery = async () => {
    if(query.value === '') {
      results.value = []
    }

    if(query.value.length > 2) {
      await searchCaptions(query.value)
    }
  }

  watchDebounced(query, onQuery, { debounce: ref(500) })

  onQuery()
</script>

<template>
    <UContainer class="py-8 flex flex-col gap-y-4">
        <UInput
          placeholder="Search by a spoken line! (e.g. barber pole factory)"
          color="secondary"
          v-model="query"
          :ui="{
            root: 'w-full',
            base: 'md:h-[5rem] md:!text-2xl md:min-w-[50rem] rounded-xl md:rounded-2xl ring-1 md:ring-2 ring-primary',
          }"
        />
    <div class="flex flex-col items-center gap-y-8 mt-4 w-full justify-center" v-if="loading">
      <UCard class="w-full" variant="soft" v-for="_ in [0,1,2]">
        <template #header>
          <USkeleton class="h-14 w-full"/>
        </template>
        <USkeleton class="h-48 w-full"/>
      </UCard>
    </div>
    <div class="flex flex-col gap-y-8 mt-4" v-if="results && !loading">
      <UCard v-for="result in results" variant="soft">
        <template #header>
          <div class="flex flex-col sm:flex-row justify-between gap-y-2 sm:gap-x-4">
            <div class="text-md order-1 sm:order-0 md:text-2xl" v-html="result.content"/>
            <div class="flex items-center gap-x-4">
              <UBadge color="secondary" icon="fluent-mdl2:video-search" :size="$device.isMobile ? 'md' : 'xl'">
                s{{ result.season.toString().padStart(2, "0") }}e{{ result.episode.toString().padStart(2, "0") }}
              </UBadge>
              <UBadge color="secondary" icon="fluent:video-person-clock-48-filled" :size="$device.isMobile ? 'md' : 'xl'">{{ result.displayStart }}</UBadge>
            </div>
          </div>
        </template>
        <div class="flex w-full justify-between overflow-x-auto gap-x-2 items-center">
            <NuxtImg
              @click="() => onFrameClick(result, frame.timestamp)"
              class="rounded-xl w-full md:w-[32%] border-primary border-2 cursor-pointer"
              v-for="frame in result.frames?.slice(0,maxFramesIndex)"
              :src="`${config.public.frameBase}${frame.uri}`"
            />
        </div>
      </UCard>
    </div>
      </UContainer>
</template>
