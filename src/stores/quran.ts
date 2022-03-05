import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

export const useQuranStore = defineStore({
  id: 'quran',

  state: () => ({
    id: 0,
    isLoading: false,
    reciter: 0,
    currentPlayingChapter: 0,
    chapters: [],
    verses: [],
    chapterNumber: 1,
    hizbNumber: 1,
    chaptersList: [],
    reciters: [],
    currentChapter: null,
    chaptersLoaded: false,
    recitersLoaded: false
  }),
  getters: {},

  actions: {
    /**
     * Loads the chapters list
     */
    async fetchAllChapters() {
      this.isLoading = true
      await axios.get('https://api.quran.com/api/v4/chapters?language=en').then((response) => {
        this.chapters = response.data.chapters
      })
      this.isLoading = false
    },

    /**
     * Fetch the verses of the current chapter
     *
     * @param id
     */
    async fetchChapter(id: number) {
      this.isLoading = true
      this.currentChapter = this.chaptersList.find((chapter) => chapter.id === id)
      await axios
        .get(`https://api.quran.com/api/v4/quran/verses/qpc_nastaleeq?chapter_number=${id}`)
        .then((response) => {
          this.verses = response.data.verses
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
    },

    /**
     * Fetch the verse of the current hizb
     *
     * @param hizbNumber
     */
    async fetchHizb(hizbNumber: number) {
      this.hizbNumber = hizbNumber
      await axios
        .get(`https://api.quran.com/api/v4/quran/verses/qpc_nastaleeq?hizb_number=${hizbNumber}`)
        .then((response) => {
          this.verses = response.data.verses
        })
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },

    /**
     * Fetch the reciters list
     */
    async fetchReciters() {
      await axios
        .get('https://api.quran.com/api/v4/resources/recitations?language=ar')
        .then((response) => {
          this.reciters = response.data.recitations
          this.reciter = this.reciters[0]
          this.recitersLoaded = true
        })
    },

    /**
     * Fetch the verses of the current chapter
     */
    async fetchchaptersInfo() {
      await axios.get('https://api.quran.com/api/v4/chapters?language=en').then((response) => {
        this.chaptersList = response.data.chapters
        this.chaptersLoaded = true
        this.currentChapter = this.chaptersList[0]
      })
    },

    /**
     * Update the current reciter
     *
     * @param id
     */
    setReciter(id) {
      this.reciter = this.reciters.find((reciter) => reciter.id === id)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuranStore, import.meta.hot))
}
