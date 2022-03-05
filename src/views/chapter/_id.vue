<script lang="ts">
  import ChapterText from '@/components/ChapterText.vue'
  import ChapterHeader from '@/components/ChapterHeader.vue'
  import Loading from '@/components/Loading.vue'
  import { defineComponent, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

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
      const router = useRouter()

      onMounted(() => {
        const id = route.params.id
        console.log(id)
        quran.fetchChapter(id)
      })

      function changeChapter(chapterNumber: number) {
        console.log(chapterNumber)
        router.push({ name: 'Chapter', params: { id: chapterNumber } })
        quran.fetchChapter(chapterNumber)
      }

      function changeHizb(hizbNumber: number) {
        quran.fetchHizb(hizbNumber)
      }

      return {
        quran,
        changeChapter,
        changeHizb
      }
    }
  })
</script>

<template>
  <div class="chapter w-full">
    <chapter-header v-on:changeChapter="changeChapter" v-on:changeHizb="changeHizb" />
    <div class="container mx-auto">
      <chapter-text
        v-if="!quran.isLoading"
        :chapterNumber="quran.chapterNumber"
        :verses="quran.verses"
      />
      <Loading v-else />
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
