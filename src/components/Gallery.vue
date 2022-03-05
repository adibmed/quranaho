<script lang="ts">
  import ChapterCard from './ChapterCard.vue'
  import { defineComponent } from 'vue'
  import Loading from '@/components/Loading.vue'

  import { useQuranStore } from '@/stores/quran'

  export default defineComponent({
    components: {
      ChapterCard,
      Loading
    },

    setup() {
      const quran = useQuranStore()
      quran.fetchAllChapters()

      return { quran }
    }
  })
</script>

<template>
  <div class="gallery pb-2">
    <div
      v-if="!quran.isLoading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3 md:gap-3 mx-2 sm:mx-0"
    >
      <chapter-card v-for="chapter in quran.chaptersList" :key="chapter.id" :chapter="chapter" />
    </div>

    <Loading v-else />
  </div>
</template>
