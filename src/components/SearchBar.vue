<script lang="ts" setup>
  import SearchDropdown from '@/components/SearchDropdown.vue'
  import { useSearchStore } from '../stores/search'
  import Icon from './Icon.vue'
  import { mdiMagnify, mdiCloseThick } from '@mdi/js'
  import { onMounted, onBeforeUnmount, ref } from 'vue'

  const input = ref(null)

  const fucusInput = (event: Event) => {
    if (event.keyCode !== 27) {
      if (input.value) input.value.focus()
    }
  }

  const search = useSearchStore()
  const translatedWords = {
    search: 'بحث',
    loadMoreMessage: 'تحميل المزيد',
    nothingFoundMessage: 'لم يتم العثور على أي نتائج'
  }

  const onInput = (event: Event) => {
    document.body.style.overflow = 'hidden'
    const query = (event.target as HTMLInputElement).value
    search.search(query)
  }

  const loadMore = () => {
    search.loadMore()
  }

  onMounted(() => {
    window.addEventListener('keyup', fucusInput)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keyup', fucusInput)
  })
</script>

<template>
  <div class="sm:max-w-full md:max-w-xl lg:max-w-2xl mx-auto">
    <div class="relative mx-2 sm:mx-0">
      <div class="w-full flex justify-center py-4">
        <button
          class="bg-gray-500 bg-opacity-10 rounded-full h-8 w-8 text-gray-700 dark:text-gray-400 grid place-content-center"
          @click="search.closeSearch"
        >
          <icon :path="mdiCloseThick" :w="'h-5'" :h="'h-5'" :size="24" />
        </button>
      </div>
      <div class="my-1 relative rounded-md shadow-sm">
        <div
          class="absolute inset-y-0 left-0 grid place-content-center pt-1 ml-3 rounded-full cursor-pointer text-gray-400 dark:text-gray-500"
        >
          <icon :path="mdiMagnify" :w="'h-12'" :h="'h-12'" :size="24" />
        </div>
        <input
          @input="onInput"
          ref="input"
          type="text"
          class="block w-full text-md text-gray-900 dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-full shadow-sm pr-3 pl-10 py-3 focus:bg-red-600 focus:outline-none focus:ring-1 focus:ring-green-400 dark:text-gray-100 focus:border-green-400"
          :placeholder="translatedWords.search + '...'"
        />
      </div>

      <div
        v-if="search.results.length === 0 && search.searchQuery !== ''"
        class="text-center text-gray-800 dark:text-gray-100 pt-2"
      >
        {{ translatedWords.nothingFoundMessage }}
      </div>

      <search-dropdown :searchResults="search.results" v-if="!search.isLoading">
        <template #load-button>
          <button @click="loadMore()" class="w-full py-3 hover:text-green-400">
            {{ `${translatedWords.loadMoreMessage} (${search.remainingResults})` }}
          </button>
        </template>
      </search-dropdown>
    </div>
  </div>
</template>
