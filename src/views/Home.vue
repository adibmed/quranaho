<template>
  <div class="xs:px-6 sm:px-2">
    <div class="container mx-auto">
      <home-header />
      <gallery />

      <modal-box v-model="isModalActive" :title="message.title" :buttonLabel="buttonLabel">
        <div class="text-lg">
          <p>{{ message.text_1 }}</p>
          <br />
          <div class="flex items-center">
            <p>{{ message.text_2 }}</p>
            <a
              class="px-2 text-red-500 font-bold"
              href="https://github.com/adibemohamed/quranaho/issues/"
              target="_blank"
              >issues</a
            >
          </div>
        </div>
      </modal-box>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Gallery from '@/components/Gallery.vue'
  import HomeHeader from '@/components/HomeHeader.vue'
  import ModalBox from '@/components/ModalBox.vue'

  import { ref } from 'vue'

  const message = {
    title: 'مهم جدا',
    text_1:
      'هذا الإصدار لا يزال في وضع التطوير. قد تلاحظ أخطاء في المحتوى ، ويجب أن تأخذ هذه الأخطاء في الاعتبار أثناء استخدام التطبيق.',
    text_2: 'إذا لاحظت أي خطأ ، يمكنك الإبلاغ عنه هنا.'
  }
  const buttonLabel = 'تم'

  const isModalActive = ref(true)
</script>
