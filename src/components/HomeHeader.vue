<script lang="ts" setup>
  import SearchBar from '@/components/SearchBar.vue'
  import { onMounted } from 'vue'
  import { useSearchStore } from '../stores/search'
  import Icon from './Icon.vue'
  import { mdiMagnify } from '@mdi/js'
  import Overlay from './Overlay.vue'

  const searchTranslation = 'بحث'
  const search = useSearchStore()

  function openSearchModal() {
    setTimeout(() => {
      search.openSearch()
    }, 100)
  }

  onMounted(() => {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode == 75 && e.ctrlKey) {
        e.preventDefault()
        if (search.showSearchModal) search.closeSearch()
        else openSearchModal()
      }
    })
  })
</script>

<template>
  <div class="header pt-8">
    <div class="w-full grid place-content-center">
      <svg class="h-44" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_7_12)">
          <path
            id="outer-circle"
            d="M218 37.5L180.5 75H127.8H75V127.7V180.5L37.3 218.2L-0.5 256L37.3 293.8L75 331.5V384.3V437H127.7H180.5L218.2 474.7L256 512.5L293.8 474.7L331.5 437H384.3H437V384.3V331.5L474.7 293.8L512.5 256L474.7 218.2L437 180.5V127.7V75H384.2H331.5L294 37.5C273.4 16.9 256.3 -7.63685e-06 256 -7.63685e-06C255.7 -7.63685e-06 238.6 16.9 218 37.5ZM285 90.5L313.5 119H353.2H393V158.7V198.5L421.7 227.2L450.5 256L421.7 284.8L393 313.5V353.3V393H353.3H313.5L284.8 421.7L256 450.5L227.2 421.7L198.5 393H158.7H119V353.3V313.5L90.3 284.8L61.5 256L90.3 227.2L119 198.5V158.7V119H158.8H198.5L227 90.5C242.7 74.8 255.7 62 256 62C256.3 62 269.3 74.8 285 90.5Z"
            fill="#34D399"
            fill-opacity="0.92"
          />
          <path
            id="inner-circle"
            d="M233.5 127L211.5 149H180.3H149V180.2V211.5L126.8 233.7L104.5 256L126.8 278.3L149 300.5V331.8V363H180.2H211.5L233.7 385.2L256 407.5L278.3 385.2L300.5 363H331.8H363V331.8V300.5L385.2 278.3L407.5 256L385.2 233.7L363 211.5V180.2V149H331.7H300.5L278.5 127C266.4 114.9 256.3 105 256 105C255.7 105 245.6 114.9 233.5 127Z"
            fill="#34D399"
            fill-opacity="0.92"
          />
        </g>
        <defs>
          <clipPath id="clip0_7_12">
            <rect width="512" height="512" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
    <transition name="slide-fade">
      <overlay v-show="search.showSearchModal" :center="false" @overlay-click="search.closeSearch">
        <search-bar v-if="search.showSearchModal" />
      </overlay>
    </transition>

    <!-- <div class="pl-1 text-gray-50 flex items-center">Ctrl + K</div> -->
    <div class="sm:max-w-full md:max-w-xl lg:max-w-2xl mx-auto my-8">
      <div class="mt-1 relative mx-2 sm:mx-0">
        <div :class="search.showSearchModal ? 'opacity-20' : 'opacity-100'">
          <div class="mt-1 relative rounded-md shadow-sm">
            <div
              class="absolute inset-y-0 left-0 flex items-center font-black pl-4 rounded-full cursor-pointer text-gray-300 dark:text-gray-500"
            >
              Ctrl + K
            </div>
            <input
              readonly
              @focus="openSearchModal()"
              type="text"
              class="block w-full text-lg text-gray-900 dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-full shadow-sm pr-12 pl-10 py-3 focus:outline-none"
              :placeholder="searchTranslation + '...'"
            />
            <div
              class="absolute inset-y-0 right-4 grid place-content-center rounded-full cursor-pointer text-gray-400"
            >
              <icon :path="mdiMagnify" :w="'h-12'" :h="'h-12'" :size="24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .slide-fade-enter-active {
    transition: all 0.2s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(100vh);
    opacity: 0;
  }

  #outer-circle {
    animation: rotation 40s infinite;
    animation-timing-function: linear;
    transform-origin: center;
  }

  #inner-circle {
    animation: rotation 50s infinite;
    animation-timing-function: linear;
    transform-origin: center;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
