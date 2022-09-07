<template>
  <b-container class="d-flex justify-content-center">
    <b-col cols="9"
    ><input
        :value="searchQuery"
        type="text"
        class="form-control"
        @keydown.enter="getFilm"
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

export default {
  methods: {
    getFilm() {
      if (this.$route.path !== "/") this.$router.replace({path: "/"});
      this.searchQuery ? this.searchMovies(this.searchQuery) : this.getFilms();
    },
    ...mapActions(["getFilms", "searchMovies"]),
    ...mapMutations(["SET_SEARCH_QUERY"]),
  },
  computed: {
    ...mapState(["isLoading", "searchQuery"]),
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
