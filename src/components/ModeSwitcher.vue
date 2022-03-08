<script lang="ts" setup>
  import { ref } from 'vue'

  const appTheme = ref('light' as string)

  function toggle() {
    // switch modes
    appTheme.value = appTheme.value === 'dark' ? 'light' : 'dark'

    // change class in html tag
    document.documentElement.setAttribute('class', appTheme.value)

    // save mode in local storage
    localStorage.setItem('mode', appTheme.value)
  }
</script>

<template>
  <button
    @click="toggle"
    class="dark:bg-gray-700 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white focus:outline-none focus:ring-0 focus:ring-trasparent"
  >
    <svg
      v-if="appTheme === 'light'"
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      ></path>
    </svg>
    <svg
      v-if="appTheme === 'dark'"
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      ></path>
    </svg>
  </button>
</template>
