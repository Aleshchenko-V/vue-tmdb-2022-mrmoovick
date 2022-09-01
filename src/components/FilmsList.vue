<template>
  <div>
    <div
      class="d-flex flex-column justify-content-center align-items-end container mt-3"
      v-if="!isLoading"
    >
      <div class="d-flex flex-row">
        <b-list-group horizontal class="flex-sm-wrap">
          <b-list-group-item
            class="w-auto m-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle card"
            v-for="movie in uniqueMovies"
            :key="movie.id"
          >
            <film-card
              :title="movie.title"
              :backdropPath="movie.backdrop_path || ''"
              :overview="movie.overview"
              :originalLanguage="movie.original_language"
              :originalTitle="movie.original_title"
              :releaseDate="movie.release_date || ''"
              :overallRating="movie.vote_average"
              :cardId="movie.id"
              @getCardId="getMovieDetails"
            >
            </film-card>
          </b-list-group-item>
        </b-list-group>
        <modal-window :genres="genres" />
      </div>
    </div>
    <div class="spinner" v-else>
      <b-spinner></b-spinner>
    </div>
    <div ref="observer"></div>
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
      totalResults: 0,
      currentPage: 1,
      genres: "",
    };
  },
  methods: {
    compareTotalResults() {
      if (this.movies.total_results > 10000) {
        this.totalResults = 10000;
      } else {
        this.totalResults = this.movies.total_results;
      }
    },
    async fetchFilms() {
      this.$store.state.isLoading = true;
      await this.$store.dispatch("getMovies");
      this.compareTotalResults();
      this.$store.state.isLoading = false;
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
  mounted() {
    setTimeout(() => {
      const observer = new IntersectionObserver(async (entries) => {
        if (
          entries[0].intersectionRatio > 0 &&
          this.currentPage !== this.movies.total_pages
        ) {
          if (this.movies.total_pages === 1) {
            return;
          }
          if (this.searchQuery && this.currentPage !== this.movies.page) {
            this.currentPage = 1;
          }
          this.currentPage += 1;
          await this.$store.dispatch("nextMoviesPage", {
            page: this.currentPage,
            query: this.searchQuery,
          });
          this.compareTotalResults();
        }
      }, {});
      observer.observe(this.$refs.observer);
    }, 1000);
  },
  computed: {
    ...mapGetters(["uniqueMovies"]),
    ...mapState(["movieDetails", "movies", "searchQuery", "isLoading"]),
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
