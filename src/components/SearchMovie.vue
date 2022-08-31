<template>
  <b-container class="d-flex justify-content-center">
    <b-col cols="9"
      ><input
        v-model.trim="searchQuery"
        type="text"
        class="form-control"
        @keydown.enter="getFilms"
        :disabled="isLoading"
    /></b-col>
    <b-col cols="2"
      ><b-button @click="getFilms" :disabled="isLoading" variant="outline-light"
        >Search</b-button
      ></b-col
    >
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    async getFilms() {
      this.$store.state.isLoading = true;
      if (this.searchQuery) {
        await this.$store.dispatch("searchMovies", this.searchQuery);
      } else {
        await this.$store.dispatch("getMovies");
      }
      this.$store.state.isLoading = false;
    },
  },
  computed: {
    ...mapState(["isLoading"]),
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
