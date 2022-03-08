<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps({
    zIndex: {
      type: String,
      default: 'z-50'
    },
    center: {
      type: Boolean,
      default: true
    }
  })

  const emit = defineEmits(['overlay-click'])

  const overlayClick = (event) => {
    emit('overlay-click', event)
  }

  const overlayClass = computed(() => {
    const classes = ['overflow-hidden', 'fixed', 'inset-0']
    if (props.center) {
      classes.push('flex items-center  justify-center flex-col')
    }
    classes.push(props.zIndex)
    return classes.join(' ')
  })
</script>

<template>
  <div :class="overlayClass" @keydown.esc="overlayClick">
    <transition
      enter-active-class="transition duration-150 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        class="absolute inset-0 backdrop-filter backdrop-blur-sm bg-black bg-opacity-20"
        @click="overlayClick"
      />
    </transition>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="animate-fadeOut"
    >
      <slot />
    </transition>
  </div>
</template>
