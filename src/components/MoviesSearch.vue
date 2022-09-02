<template>
  <b-container>
    <div>
      <b-row class="text-center m-3">
        <b-col cols="9"
        ><input
            v-model.trim="searchQuery"
            type="text"
            class="form-control"
            @keydown.enter="getFilms"
            :disabled="isLoading"
        /></b-col>
        <b-col
        ><b-button
            @click="getFilms"
            :disabled="isLoading"
            variant="outline-light"
        >Search</b-button
        ></b-col
        >
      </b-row>
      <div class="loader" v-if="isLoading">
        <b-spinner label="Loading..."></b-spinner>
      </div>
    </div>
  </b-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "MoviesSearch",
  data() {
    return {
      searchQuery: "",
      isLoading: false,
    };
  },
  methods: {
    getFilms() {
      this.isLoading = true;
      if (this.searchQuery) {
        this.searchMovies(this.searchQuery)
      } else {
        this.getMovies()
      }
      this.isLoading = false;
    },
    ...mapActions(['searchMovies', 'getMovies']),
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
