<template>
  <div
    class="d-flex justify-content-center align-items-end container"
    v-if="!loading"
  >
    <b-list-group horizontal class="flex-sm-wrap">
      <b-list-group-item
        class="w-auto m-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle card"
        v-for="movie in movies.results"
        :key="movie.id"
      >
        <film-card
          :title="movie.title"
          :backdropPath="movie.backdrop_path"
          :overview="movie.overview"
          :originalLanguage="movie.original_language"
          :originalTitle="movie.original_title"
          :releaseDate="movie.release_date"
          :overallRating="movie.vote_average"
        >
        </film-card>
      </b-list-group-item>
    </b-list-group>
    <modal-window />
  </div>
  <div class="spinner" v-else>
    <b-spinner label="Loading..."></b-spinner>
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard";
import ModalWindow from "@/components/ModalWindow.vue";

import { mapGetters } from "vuex";
export default {
  name: "FilmsList",
  components: { FilmCard, ModalWindow },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async fetchFilms() {
      this.loading = true;

      await this.$store.dispatch("getMovies");

      this.loading = false;
    },
  },
  created() {
    this.fetchFilms();
  },
  mounted() {
    this.$root.$on("bv::modal::show", (bvEvent, modalId) => {
      console.log("Modal is about to be shown", bvEvent, modalId);
    });
  },
  computed: {
    ...mapGetters(["movies"]),
  },
};
</script>

<style scoped>
.card {
  border-radius: 20px;
}
.container {
  max-width: 1160px;
}
.spinner {
  height: 888px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
