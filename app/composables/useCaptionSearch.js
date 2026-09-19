export const useCaptionSearch = () => {
  const config = useRuntimeConfig()

  const loading = ref(false)

  const results = ref(null)

  const searchCaptions = async (query) => {
    loading.value = true

    try {
      results.value = await $fetch('/captions', {
        baseURL: config.public.apiBase,
        query: {
          query
        }
      })
    } catch (e) {
      console.error(e)
    }
    finally {
      loading.value = false
    }
  }

  return {
    searchCaptions,
    loading,
    results
  }
}
