// @ts-nocheck
import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

export const useSearchStore = defineStore({
  id: 'search',

  state: () => ({
    isLoading: false,
    showSearchModal: false,
    results: [],
    searchQuery: '',
    remainingResults: 0,
    totalPages: 0,
    currentPage: 1
  }),

  actions: {
    /**
     * Search for a query
     *
     * @param query
     */
    search(query: string) {
      // this.setState()
      this.searchQuery = query
      this.submitQuery()
    },

    /**
     * Submit the search query to the API
     */
    async submitQuery() {
      this.isLoading = true
      await axios
        .get(
          `https://api.quran.com/api/v4/search?q=${this.searchQuery}&size=20&page=${this.currentPage}&language=en`
        )
        .then((response) => {
          // this.results = this.results.concat(response.data.search.results)
          this.results = response.data.search.results
          this.remainingResults = response.data.search.total_results - this.results.length
          this.totalPages = response.data.search.total_pages
        })
      this.isLoading = false
    },

    /**
     * Load more results
     */
    async loadMore() {
      this.currentPage++
      await this.submitQuery()
    },

    /**
     * Toggle the search modal
     */
    openSearch() {
      this.showSearchModal = true
    },

    /**
     * Close the search modal
     */
    closeSearch() {
      this.showSearchModal = false
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}
