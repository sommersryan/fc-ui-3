export const useFrameBrowse = () => {
  const pointer = ref(0)

  const frames = ref([])

  //last/first caption in list computed prop maybe?

  return {
    pointer,
    frames
  }
}
