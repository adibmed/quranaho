<script lang="ts">
  import VerseIcon from '@/components/icons/VerseIcon.vue'
  import { defineComponent } from 'vue'
  import { useQuranStore } from '@/stores/quran'
  import StartVerse from './StartVerse.vue'

  export default defineComponent({
    components: {
      VerseIcon,
      StartVerse
    },
    props: {
      chapterNumber: {
        type: Number,
        default: 0
      },
      verses: {
        default: () => [],
        type: Array
      }
    },

    setup() {
      const quran = useQuranStore()
      const chapterTranslation = 'سورة'

      return {
        quran,
        chapterTranslation
      }
    }
  })
</script>

<template>
  <div
    class="dark:text-white leading-normal text-justify pt-4 min-h-screen lg:max-w-2xl sm:mx-auto pb-16 mx-3"
  >
    <p
      v-if="!quran.isLoadingChapters"
      class="arabic p-2 text-2xl text-center border-2 dark:text-gray-300 border-green-400 dark:border-green-400 bg-gray-100 dark:bg-gray-700 rounded"
    >
      <span class="px-1">{{ chapterTranslation }}</span>
      <span class="px-1">{{ quran.currentChapter.name_arabic }}</span>
    </p>

    <div
      class="quran text-4xl p-5 whitespace-nowrap break-words border-2 rounded border-gray-600 mt-4"
    >
      <div class="flex justify-center py-4">
        <StartVerse />
      </div>
      <span
        v-for="verse in quran.verses"
        :key="verse.verse_key"
        class="whitespace-normal break-words leading-loose"
      >
        <span v-for="word in verse.text_qpc_nastaleeq.split(' ')" class="pt-1">
          {{ word.concat(' ') }}
        </span>
      </span>
    </div>
  </div>
</template>
