<script lang="ts" setup>
  defineProps({
    chapter: {
      type: Object
    }
  })

  const verse = 'آية'
</script>

<template>
  <div
    class="border-2 dark:border-white dark:border-opacity-40 hover:border-green-400 dark:hover:border-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 delay-75 rounded"
  >
    <router-link :to="{ name: 'Chapter', params: { id: chapter?.id } }">
      <div class="w-full inline-flex items-center justify-start px-3 sm:px-6 py-2 sm:py-4">
        <div class="flex-1 text-lg sm:text-2xl items-center justify-center flex-col">
          <p class="arabic text-gray-700 dark:text-gray-300">
            {{ chapter?.name_arabic }}
            <span class="pr-2 opacity-30 text-sm font-bold">
              <span> {{ '(' + chapter?.verses_count }}</span
              ><span class="mx-0.5">{{ verse + ')' }}</span>
            </span>
          </p>
        </div>
        <div class="flex flex-col pl-4">
          <p class="text-sm sm:text-md text-left font-medium text-gray-700 dark:text-gray-300">
            {{ chapter?.translated_name.name }}
          </p>
          <p></p>
          <p class="text-sm text-left text-gray-500 font-normal dark:text-gray-400">
            {{ chapter?.name_complex }}
          </p>
        </div>

        <div
          class="rounded-md text-sm font-semibold bg-green-400 dark:bg-green-400 text-gray-500 dark:text-gray-800 flex flex-wrap justify-center items-center h-8 w-8"
        >
          {{ chapter?.id }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<style>
  .card {
    background: rgba(255, 255, 255, 0.25) !important;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37) !important;
    backdrop-filter: blur(4px) !important;
    -webkit-backdrop-filter: blur(4px) !important;
    border-radius: 8px !important;
    border: 1px solid rgba(255, 255, 255, 0.18) !important;
  }
</style>
