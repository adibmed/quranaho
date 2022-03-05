import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

export const useSearchStore = defineStore({
  id: 'search',

  state: () => ({
    isLoading: false,
    showSearchModal: false,
    searchResults: [],
    searchQuery: '',
    searchLoading: false,
    searchError: null,
    remainingResults: 0,
    totalPages: 0
  }),

  actions: {
    // search() {},
    async submitQuery(query: string) {
      await axios
        .get(
          `https://api.quran.com/api/v4/search?q=${this.searchQuery}&size=20&page=${this.currentPage}&language=en`
        )
        .then((response) => {
          this.searchResults = this.searchResults.concat(response.data.search.results)
          this.searchResultsLoaded = true
          this.remainingResults = response.data.search.total_results - this.searchResults.length
          this.totalPages = response.data.search.total_pages
        })
    },
    loadMore() {
      // this.isInputActive = false
      // await this.loadResults()
      // this.currentPage++
    },

    openSearch() {
      this.showSearchModal = true
    },

    closeSearch() {
      this.showSearchModal = false
    }
  }
})
