<script lang="ts" setup>
  import ChapterCard from './ChapterCard.vue'
  import Loading from '@/components/Loading.vue'
  import { useQuranStore } from '@/stores/quran'

  const quran = useQuranStore()
  quran.fetchAllChapters()
</script>

<template>
  <div class="pb-2">
    <div
      v-if="!quran.isLoadingChapters"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3 md:gap-3 mx-2 sm:mx-0"
    >
      <chapter-card v-for="chapter in quran.chapters" :key="chapter.id" :chapter="chapter" />
    </div>

    <Loading v-else />
  </div>
</template>
