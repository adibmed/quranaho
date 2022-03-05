<script lang="ts">
  import ChapterText from '@/components/ChapterText.vue'
  import ChapterHeader from '@/components/ChapterHeader.vue'
  import Loading from '@/components/Loading.vue'
  import { defineComponent } from 'vue'
  import { useRoute } from 'vue-router'
  import { useQuranStore } from '@/stores/quran'

  export default defineComponent({
    components: {
      ChapterText,
      ChapterHeader,
      Loading
    },

    setup() {
      const quran = useQuranStore()
      const route = useRoute()

      const id = Number(route.params.id)
      quran.fetchChapter(id)

      return {
        quran
      }
    }
  })
</script>

<template>
  <div class="chapter w-full">
    <chapter-header />
    <div class="container mx-auto">
      <chapter-text
        v-if="!quran.isLoadingChapter"
        :chapterNumber="quran.chapterNumber"
        :verses="quran.verses"
      />
    </div>
  </div>
</template>

<style>
  .chapter__container {
    line-height: 4rem;
  }
  .chapter__verseNumberIcon,
  .chapter__verseNumberIcon svg {
    height: 40px;
    display: inline-block;
  }
</style>
