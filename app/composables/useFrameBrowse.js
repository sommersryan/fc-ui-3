export const useFrameBrowse = () => {
  const pointer = ref(0)

  const frames = ref([])

  const loading = ref(false)

  const captions = ref([])

  const config = useRuntimeConfig()

  const fetchCaptions = async (season, episode, index) => {
    loading.value = true
    try {
      captions.value = await $fetch('/caption', {
          baseURL: config.public.apiBase,
            query: {
              season,
              episode,
              index,
              direction: 'Surrounding'
          }
        })
      } catch (e) {
        console.error(e)
      }
      finally {
        loading.value = false
      }
    }
  //last/first caption in list computed prop maybe?

  return {
    pointer,
    frames,
    captions,
    fetchCaptions,
    loading
  }
}
