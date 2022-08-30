<template>
  <div
    class="d-flex justify-content-center align-items-end container"
    v-if="!loading"
  >
    <b-list-group horizontal class="flex-sm-wrap">
      <b-list-group-item
        class="w-auto m-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle card"
        v-for="movie in uniqueMovies"
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
          :cardId="movie.id"
          @getCardId="getMovieDetails"
        >
        </film-card>
      </b-list-group-item>
    </b-list-group>
    <modal-window :genres="genres" />
  </div>
  <div class="spinner" v-else>
    <b-spinner label="Loading..."></b-spinner>
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard";
import ModalWindow from "@/components/ModalWindow.vue";

import { mapGetters, mapState } from "vuex";
export default {
  name: "FilmsList",
  components: { FilmCard, ModalWindow },
  data() {
    return {
      loading: false,
      genres: "",
    };
  },
  methods: {
    async fetchFilms() {
      this.loading = true;

      await this.$store.dispatch("getMovies");

      this.loading = false;
    },
    async getMovieDetails(card) {
      await this.$store.dispatch("getMovieDetails", card);
      const unFilteredGenres = this.movieDetails.genres.map((el) => el.name);
      this.genres =
        unFilteredGenres.length > 3
          ? unFilteredGenres.slice(0, 3).join(", ") + "..."
          : unFilteredGenres.join(", ");
    },
  },
  created() {
    this.fetchFilms();
  },

  computed: {
    ...mapGetters(["uniqueMovies"]),
    ...mapState(["movieDetails"]),
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
