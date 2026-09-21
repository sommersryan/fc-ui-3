<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Funcooker'
const description = 'A 30 Rock search engine'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader :ui="{ toggle: 'hidden'}">
      <template #left>
        <NuxtLink
          to="/"
          class="focus-visible:outline-3 flex items-center outline-primary/25 rounded-md p-1 text-2xl md:text-5xl gap-x-2 font-bold -ms-1"
        >
          <UIcon class="text-primary" name="griddy-icons:microwave"></UIcon>
          <span>funcooker</span>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="griddy-icons:microwave" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          By <a href="https://bsky.app/profile/phylan.website" target="_blank">@phylan</a>
        </p>
      </template>

      <template #right>

      </template>
    </UFooter>
  </UApp>
</template>
