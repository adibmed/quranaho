<template>
  <div class="about h-screen">
    <div class="container mx-auto">
      <div class="text-lg text-gray-800 text-left w-full dark:text-gray-100">
        <div class="text-9xl text-center pt-32 py-8 font-black opacity-50">
          This page is under construction
        </div>
        <div class="text-xl text-center py-8">
          Join Us:
          <a
            class="text-green-400 font-black"
            href="https://github.com/adibemohamed/quranaho"
            target="_blank"
            >🚀 GitHub
          </a>
        </div>
        <div class="flex justify-center mt-8">
          <a href="https://ko-fi.com/K3K690OEW" target="_blank"
            ><img
              height="40"
              style="border: 0px; height: 40px; padding: 0px 10px"
              src="https://cdn.ko-fi.com/cdn/kofi1.png?v=3"
              alt="Buy Me a Coffee at ko-fi.com"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    data() {
      return {
        message: 'إشتري لي قهوة'
      }
    }
  })
</script>
