<template>
  <b-container class="d-flex justify-content-center">
    <b-col cols="9"
      ><input
        :value="searchQuery"
        type="text"
        class="form-control"
        @keydown.enter="getFilms"
        @input="updateSearch($event.target.value)"
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
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(["getFilms", "updateSearch"]),
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapGetters(["searchQuery"]),
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
