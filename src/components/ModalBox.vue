<script lang="ts" setup>
  import { computed } from 'vue'
  //   import { mdiClose } from '@mdi/js'
  import Overlay from '@/components/Overlay.vue'

  const props = defineProps({
    title: {
      type: String,
      default: null
    },
    largeTitle: {
      type: String,
      default: null
    },
    button: {
      type: String,
      default: 'info'
    },
    buttonLabel: {
      type: String,
      default: 'Done'
    },
    hasCancel: Boolean,
    modelValue: {
      type: [String, Number, Boolean],
      default: null
    }
  })

  const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

  const value = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })

  const confirmCancel = (mode) => {
    value.value = false
    emit(mode)
  }

  const confirm = () => confirmCancel('confirm')

  const cancel = () => confirmCancel('cancel')
</script>

<template>
  <overlay v-show="value" @overlay-click="cancel">
    <div class="shadow-lg w-full max-h-modal md:w-3/5 lg:w-2/5 z-50 bg-white border dark:border-gray-800">
      <div class="space-y-3">
        <h1 v-if="largeTitle" class="text-2xl">
          {{ largeTitle }}
        </h1>
        <slot />
      </div>

      <div>
        <!-- <button :label="buttonLabel" :color="button" @click="confirm" />
        <button v-if="hasCancel" label="Cancel" :color="button" outline @click="cancel" /> -->
      </div>
    </div>
  </overlay>
</template>
