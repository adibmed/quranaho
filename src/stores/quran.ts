// @ts-nocheck
import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

export const useQuranStore = defineStore({
  id: 'quran',

  state: () => ({
    id: 0,
    isLoadingChapters: true,
    isLoadingReciters: true,
    isLoadingChapter: true,
    isLoadingHizb: true,
    reciterId: 1,
    verses: [],
    chapterNumber: 1,
    hizbNumber: 1,
    chapters: [],
    reciters: [],
    currentChapter: null,
    chaptersLoaded: false,
    recitersLoaded: false
  }),

  getters: {
    currentChapter: (state) => {
      return state.chapters.find((chapter) => chapter.id == state.chapterNumber)
    },

    currentReciter: (state) => {
      return state.reciters.find((reciter) => reciter.id == state.reciterId)
    }
  },

  actions: {
    /**
     * Loads the chapters list
     */
    async fetchAllChapters() {
      this.isLoadingChapters = true
      await axios.get('https://api.quran.com/api/v4/chapters?language=en').then((response) => {
        this.isLoadingChapters = false
        this.chapters = response.data.chapters
      })
    },

    /**
     * Fetch the verses of the current chapter
     *
     * @param id
     */
    async fetchChapter(id: number) {
      this.isLoadingChapter = true
      this.chapterNumber = id
      await axios
        .get(`https://api.quran.com/api/v4/quran/verses/qpc_nastaleeq?chapter_number=${id}`)
        .then((response) => {
          this.verses = response.data.verses
          this.isLoadingChapter = false
        })
    },

    /**
     * Fetch the verse of the current hizb
     *
     * @param hizbNumber
     */
    async fetchHizb(hizbNumber: number) {
      this.isLoadingHizb = true
      this.hizbNumber = hizbNumber
      await axios
        .get(`https://api.quran.com/api/v4/quran/verses/qpc_nastaleeq?hizb_number=${hizbNumber}`)
        .then((response) => {
          this.verses = response.data.verses
        })
      this.isLoadingHizb = false
    },

    /**
     * Fetch the reciters list
     */
    async fetchReciters() {
      this.isLoadingReciters = true
      await axios
        .get('https://api.quran.com/api/v4/resources/recitations?language=ar')
        .then((response) => {
          this.reciters = response.data.recitations
          this.reciter = this.reciters[this.reciterId]
        })
      this.isLoadingReciters = false
    },

    /**
     * Set reciter
     * @param id
     */

    setReciter(id: number) {
      this.reciterId = id
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuranStore, import.meta.hot))
}
