<template>
  <b-container class="d-flex justify-content-center">
    <b-col cols="9"
    ><input
        :value="searchQuery"
        type="text"
        class="form-control"
        @keyup="throttledSearch"
        @keyup.enter="getFilm"
        @click.stop="changeVisible(true)"
        @input="SET_SEARCH_QUERY($event.target.value.trim())"
        :disabled="isLoading"
    /></b-col>
    <b-col cols="2"
    >
      <b-button @click="getFilm" :disabled="isLoading" variant="outline-light"
      >Search
      </b-button
      >
    </b-col
    >
  </b-container>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import debounce from "lodash.debounce";

export default {
  methods: {
    getMultiSearchResults() {
      this.multiSearch(this.searchQuery)
    },
    getFilm() {
      this.$router.replace('/');
      this.movieSearch(this.searchQuery);
    },
    ...mapActions(["getFilms", "multiSearch", "movieSearch"]),
    ...mapMutations(["SET_SEARCH_QUERY", "changeVisible"]),
  },
  computed: {
    ...mapState(["isLoading", "searchQuery"]),
    throttledSearch() {
      let DELAY = 750;
      return debounce(this.getMultiSearchResults, DELAY);
    }
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
