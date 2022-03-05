<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'
  import { useQuranStore } from '@/stores/quran'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    setup() {
      const quran = useQuranStore()
      const router = useRouter()
      const showRecitersDropdown = ref(false)
      const showChaptersDropdown = ref(false)
      const showHizbsDropdown = ref(false)
      const translatedWords = {
        chapters: 'جميع السور',
        about: 'معلومات عنا',
        title: 'القرآن الكريم',
        hizb: 'حزب',
        juz: 'جزء',
        rub: 'ربع'
      }
      const isAnyMenuOpen = computed(() => {
        return showChaptersDropdown.value || showHizbsDropdown.value || showRecitersDropdown.value
      })

      quran.fetchchaptersInfo()
      quran.fetchReciters()

      function changeReciter(reciterNumber: number) {
        closeAllMenus()
        quran.setReciter(reciterNumber)
      }

      function changeChapter(chapterNumber: number) {
        closeAllMenus()
        quran.fetchChapter(chapterNumber)
        router.push({ name: 'Chapter', params: { id: chapterNumber } })
      }

      function changeHizb(hizbNumber: number) {
        quran.fetchHizb(hizbNumber)
      }

      function closeAllMenus() {
        showChaptersDropdown.value = false
        showHizbsDropdown.value = false
        showRecitersDropdown.value = false
      }

      return {
        quran,
        changeReciter,
        changeChapter,
        changeHizb,
        closeAllMenus,
        showRecitersDropdown,
        showChaptersDropdown,
        showHizbsDropdown,
        translatedWords,
        isAnyMenuOpen
      }
    }
  })
</script>

<template>
  <div v-if="quran.chaptersLoaded && quran.recitersLoaded" class="px-2 sm:px-0 w-full">
    <div class="container sm:mx-auto lg:max-w-2xl py-4 sm:flex">
      <!-- Chapters dropdown  -->
      <div class="flex-1 mt-2 sm:pt-0">
        <button
          @click="showChaptersDropdown = !showChaptersDropdown"
          class="py-2 w-full border-2 dark:border-white dark:border-opacity-40 text-gray-700 dark:text-gray-300 hover:border-green-400 dark:hover:border-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 delay-75 rounded"
        >
          {{ quran.currentChapter.name_arabic }}
        </button>
        <ul
          id="list"
          v-if="showChaptersDropdown"
          class="text-right absolute w-full left-0 sm:left-auto sm:w-60 z-50 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 mt-1 shadow-xl max-h-96 border-2 rounded-mdpy-1 overflow-auto"
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          <li
            v-for="chapter in quran.chaptersList"
            :key="chapter.id"
            class="hover:border-green-400 dark:hover:border-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 py-1 relative cursor-pointer border-b-2 px-2"
            id="listbox-option-0"
            role="option"
            @click="changeChapter(chapter.id)"
          >
            <span class="text-md my-1 font-normal ml-3 block truncate">{{
              chapter.name_arabic
            }}</span>
          </li>
        </ul>
      </div>

      <!-- Hizbs dropdown -->
      <div class="sm:mx-4 flex-1 mt-2 sm:pt-0">
        <button
          @click="showHizbsDropdown = !showHizbsDropdown"
          class="py-2 w-full border-2 dark:border-white dark:border-opacity-40 text-gray-700 dark:text-gray-300 hover:border-green-400 dark:hover:border-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 delay-75 rounded"
        >
          <p class="text-md font-normal ml-3 block truncate">
            <span>{{ translatedWords.hizb }}</span>
            <span class="mx-1">{{ hizbNumber }}</span>
          </p>
        </button>
        <ul
          id="list"
          v-if="showHizbsDropdown"
          class="text-right absolute w-full left-0 sm:left-auto sm:w-60 z-50 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 mt-1 shadow-xl max-h-96 border-2 rounded-mdpy-1 overflow-auto"
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          <li
            v-for="hizb in 60"
            :key="hizb"
            class="hover:border-green-400 dark:hover:border-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 py-1 relative cursor-pointer border-b-2 px-2"
            id="listbox-option-0"
            role="option"
            @click="changeHizb(hizb)"
          >
            <p class="text-md my-1 font-normal ml-3 block truncate">
              <span>{{ translatedWords.hizb }}</span>
              <span class="mx-1">{{ hizb }}</span>
            </p>
          </li>
        </ul>
      </div>

      <!-- Reciters dropdown  -->
      <div class="flex-1 mt-2 sm:pt-0">
        <button
          @click="showRecitersDropdown = !showRecitersDropdown"
          class="py-2 w-full border-2 dark:border-white dark:border-opacity-40 text-gray-700 dark:text-gray-300 hover:border-green-400 dark:hover:border-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 delay-75 rounded"
        >
          {{ quran.reciter.translated_name.name }}
        </button>
        <ul
          id="list"
          v-if="showRecitersDropdown"
          class="text-right absolute w-full left-0 sm:left-auto sm:w-60 z-50 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 mt-1 shadow-xl max-h-96 border-2 rounded-mdpy-1 overflow-auto"
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          <li
            v-for="reciter in quran.reciters"
            :key="reciter.id"
            class="hover:border-green-400 dark:hover:border-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 py-1 relative cursor-pointer border-b-2 px-2"
            id="listbox-option-0"
            role="option"
            @click="changeReciter(reciter.id)"
          >
            <span class="text-md my-1 font-normal ml-3 block truncate">{{
              reciter.translated_name.name
            }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="fixed h-screen w-full left-0 top-0 z-40"
      v-if="isAnyMenuOpen"
      @click="closeAllMenus()"
    ></div>
  </div>
</template>
