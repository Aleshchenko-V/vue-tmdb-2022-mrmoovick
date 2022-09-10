<template>
  <b-container class="d-flex justify-content-center">
    <b-col cols="9">
      <b-overlay :show="isShown" rounded="sm" style="width: 500px">
        <input
            :value="searchQuery"
            type="text"
            class="form-control"
            @keyup="throttledSearch"
            @keyup.enter="getFilm(), clearFilters()"
            @keyup.escape="clearSelectedQuery()"
            @click.stop="changeVisible(true)"
            @input="SET_SEARCH_QUERY($event.target.value.trim())"
            :disabled="isLoading"
        />
      </b-overlay>
    </b-col>
    <b-col cols="2">
      <b-button @click="getFilm(), clearFilters()" :disabled="isLoading" variant="outline-light"
      >Search
      </b-button>
    </b-col>
  </b-container>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import debounce from "lodash.debounce";

export default {
  methods: {
    getMultiSearchResults() {
      if (!this.searchQuery) {
        this.clearSelectedQuery();
      }
      if (this.searchQuery !== this.selectedSearchQuery) {
        this.multiSearch(this.searchQuery);
      } else {
        return
      }
    },
    getFilm() {
      if (this.searchQuery && this.searchQuery !== this.selectedSearchQuery) {
        this.multiSearch(this.searchQuery);
        if (this.$route.path !== "/results") {
          this.$router.replace("/results");
        }
      } else {
        return;
      }
      this.clearSelectedQuery();
    },
    ...mapActions(["multiSearch"]),
    ...mapMutations(["SET_SEARCH_QUERY", "changeVisible", "clearFilters", "clearSelectedQuery"]),
  },
  computed: {
    ...mapState(["isLoading", "searchQuery", "isShown", "selectedSearchQuery"]),
    ...mapGetters(["sortedTypes"]),
    throttledSearch() {
      let DELAY = 750;
      return debounce(this.getMultiSearchResults, DELAY);
    },
  },
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: none;
  border: none;
}

.loader {
  height: 888px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
