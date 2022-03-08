<script lang="ts" setup>
  import Icon from './Icon.vue'
  import { mdiWhiteBalanceSunny, mdiBrightness2 } from '@mdi/js'
  import { ref } from 'vue'

  const appTheme = ref('light' as string)

  function toggle() {
    document.documentElement.setAttribute('class', appTheme.value)
    appTheme.value = appTheme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('mode', appTheme.value)
  }
</script>

<template>
  <button
    @click="toggle"
    class="w-8 h-8 rounded-full grid place-content-center text-gray-500 hover:text-green-500"
  >
    <icon
      v-if="appTheme === 'dark'"
      :path="mdiWhiteBalanceSunny"
      :w="'h-5'"
      :h="'h-5'"
      :size="24"
    />
    <icon v-if="appTheme === 'light'" :path="mdiBrightness2" :w="'h-5'" :h="'h-5'" :size="24" />
  </button>
</template>
