<script lang="ts" setup>
  defineProps({
    searchResults: {
      type: Array,
      required: true
    }
  })
</script>

<template>
  <ul
    id="list"
    v-if="searchResults.length > 0"
    style="max-height: calc(100vh - 200px)"
    class="absolute text-gray-900 bg-white dark:bg-gray-700 dark:text-gray-100 z-50 mt-1 w-full shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
    tabindex="-1"
    role="listbox"
    aria-labelledby="listbox-label"
    aria-activedescendant="listbox-option-3"
  >
    <router-link to="/">
      <li
        v-for="(result, index) in searchResults"
        :key="index"
        class="select-none p-1 relative border-b-2 border-opacity-10 hover:bg-gray-100 dark:hover:bg-gray-800"
        id="listbox-option-0"
        role="option"
      >
        <div>
          <span
            class="rounded-sm bg-green-400 dark:bg-green-400 text-gray-500 dark:text-gray-800 p-1 text-xs"
            >{{ result.verse_id }}</span
          >
          <span class="quran pt-1 text-xl font-normal ml-3 block truncate">
            {{ result.text }}
          </span>
          <!-- <p>{{ result.translations[0].text }}</p> -->
        </div>
      </li>
    </router-link>
    <slot name="load-button" />
  </ul>
</template>
