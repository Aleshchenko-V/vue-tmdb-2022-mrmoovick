<template>
  <b-container>
    <div>
      <b-row class="text-center m-3">
        <b-col cols="9"
          ><input
            v-model="searchQuery"
            type="text"
            class="form-control"
            @keydown.enter="getFilms"
            :disabled="isloading"
        /></b-col>
        <b-col
          ><b-button
            @click="getFilms"
            :disabled="isLoading"
            variant="outline-primary"
            >Search</b-button
          ></b-col
        >
      </b-row>
      <div
        style="
          height: 888px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
        v-if="isLoading"
      >
        <b-spinner label="Loading..."></b-spinner>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      isLoading: false,
    };
  },
  methods: {
    async getFilms() {
      this.isLoading = true;
      await this.$store.dispatch("searchMovies", this.searchQuery);
      this.isLoading = false;
    },
  },
  computed: {},
};
</script>
