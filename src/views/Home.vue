<template>
  <div class="xs:px-6 sm:px-2">
    <div class="container mx-auto">
      <home-header />
      <gallery />
      <modal-box
        v-model="isModalDangerActive"
        large-title="Please confirm"
        button="danger"
        has-cancel
      >
        <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
        <p>This is sample modal</p>
      </modal-box>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Gallery from '@/components/Gallery.vue'
  import HomeHeader from '@/components/HomeHeader.vue'
  import ModalBox from '@/components/ModalBox.vue'

  import { ref } from 'vue'

  const isModalDangerActive = ref(true)
</script>
