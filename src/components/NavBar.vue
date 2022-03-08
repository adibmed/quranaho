<script lang="ts" setup>
  import ModeSwitcher from '@/components/ModeSwitcher.vue'
  import { ref } from 'vue'
  import NavBarItem from './NavBarItem.vue'
  import NavBarItemLabel from './NavBarItemLabel.vue'
  import NavBarMenuToggler from './NavBarMenuToggler.vue'
  import Icon from './Icon.vue'
  import { mdiCoffee } from '@mdi/js'

  const isHidden = ref(true)
  const translatedWords = {
    chapters: 'جميع السور',
    about: 'معلومات عنا',
    title: 'القرآن الكريم'
  }

  function toggle() {
    isHidden.value = true
  }
</script>

<template>
  <nav class="border-b-2 border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <nav-bar-menu-toggler @click="toggle" :is-hidden="isHidden" />
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <div class="flex items-center">
              <img class="hidden sm:block h-8 sm:h-10 w-auto pl-4 sm:pl-0" src="../assets/logo.png" alt="quran-karem" />
              <router-link to="/">
                <img src="@/assets/quran-karem.png" alt="quran-karem" class="h-10" />
              </router-link>
            </div>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <nav-bar-item :to="'/'">
                <nav-bar-item-label :label="translatedWords.chapters"></nav-bar-item-label>
              </nav-bar-item>
              <nav-bar-item :to="'/about'">
                <nav-bar-item-label :label="translatedWords.about"></nav-bar-item-label>
              </nav-bar-item>
            </div>
          </div>
        </div>
        <div
          class="absolute right-0 flex items-center justify-between pr-2 sm:static sm:inset-auto sm:pr-0"
        >
          <mode-switcher />

          <a
            class="w-8 h-8 rounded-full mr-2 grid place-content-center text-gray-400 dark:text-gray-500 hover:text-green-500"
            href="https://ko-fi.com/K3K690OEW"
            target="_blank"
          >
            <icon :path="mdiCoffee" :w="'h-5'" :h="'h-5'" :size="24" />
          </a>
        </div>
      </div>
    </div>

    <div class="sm:hidden bg-gray-200 dark:bg-gray-700" :class="isHidden ? 'hidden' : ''">
      <div class="px-2 pt-2 pb-3 flex flex-col">
        <nav-bar-item :to="'/'">
          <nav-bar-item-label :label="translatedWords.chapters"></nav-bar-item-label>
        </nav-bar-item>
        <nav-bar-item :to="'/about'">
          <nav-bar-item-label :label="translatedWords.about"></nav-bar-item-label>
        </nav-bar-item>
      </div>
    </div>
  </nav>
</template>
