<template>
  <b-container class="d-flex justify-content-center">
    <b-col cols="9">
      <b-overlay
        :show="isShown"
        rounded="sm"
        style="max-width: 500px; min-width: 200px"
      >
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
          placeholder="Type some query"
        />
      </b-overlay>
    </b-col>
    <b-col cols="2">
      <b-button
        class="search-btn"
        @click="getFilm(), clearFilters()"
        :disabled="isLoading"
        variant="outline-light"
        >Search
      </b-button>
    </b-col>
  </b-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
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
        return;
      }
    },
    getFilm() {
      if (this.searchQuery) {
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
    ...mapMutations([
      "SET_SEARCH_QUERY",
      "changeVisible",
      "clearFilters",
      "clearSelectedQuery",
    ]),
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

<style scoped lang="scss">
.form-control {
  font-family: "Oswald";
}

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
.search-btn {
  box-shadow: 7px 3px 10px rgba(19, 19, 19, 0.4);
  transition: 0.3s;
  &:active {
    transform: translateX(5px);
  }
}
</style>
