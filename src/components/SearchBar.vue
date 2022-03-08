<script lang="ts" setup>
  import SearchDropdown from '@/components/SearchDropdown.vue'
  import SearchIcon from '@/components/icons/SearchIcon.vue'
  import CloseIcon from './icons/CloseIcon.vue'
  import { useSearchStore } from '../stores/search'

  const search = useSearchStore()
  const translatedWords = {
    search: 'بحث',
    loadMoreMessage: 'تحميل المزيد',
    nothingFoundMessage: 'لم يتم العثور على أي نتائج'
  }

  function onInput(event: Event) {
    // disable body scrolling when search is open
    document.body.style.overflow = 'hidden'
    const query = (event.target as HTMLInputElement).value
    search.search(query)
  }

  function closeSearchModal(): void {
    search.closeSearch()
    search.$reset()
    document.body.style.overflow = 'initial'
  }

  function loadMore() {
    search.loadMore()
  }
</script>

<template>
  <div
    tabindex="0"
    class="fixed left-0 top-0 w-full h-screen z-40"
    @keydown.esc="closeSearchModal()"
  >
    <div class="sm:max-w-full md:max-w-xl lg:max-w-2xl mx-auto z-50">
      <div class="relative mx-2 sm:mx-0 z-50">
        <div class="w-full flex justify-center py-4">
          <button
            class="bg-gray-500 bg-opacity-10 rounded-full text-gray-700 dark:text-gray-400"
            @click="closeSearchModal()"
          >
            <close-icon />
          </button>
        </div>
        <div class="my-1 relative rounded-md shadow-sm">
          <div
            class="absolute inset-y-0 left-0 grid place-content-center pt-1 ml-3 rounded-full cursor-pointer text-gray-400 dark:text-gray-500"
          >
            <search-icon />
          </div>
          <input
            @input="onInput"
            type="text"
            class="block w-full text-md text-gray-900 dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-full shadow-sm pr-3 pl-10 py-3 focus:outline-none focus:ring-1 focus:ring-green-400 dark:text-gray-100 focus:border-green-400"
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
    <div
      @click.self="closeSearchModal()"
      class="fixed left-0 top-0 h-screen w-full backdrop-filter backdrop-blur-sm bg-black bg-opacity-20 overflow-hidden z-40"
    >
      <button @click="closeSearchModal()" class="absolute left-0 pl-4 pt-4 text-gray-500">
        Esc
      </button>
    </div>
  </div>
</template>
