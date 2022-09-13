<template>
  <div class="film-list">
    <div
      class="d-flex flex-column justify-content-center align-items-center container mt-3"
      v-if="!isLoading"
    >
      <div class="d-flex flex-row" v-if="uniqueMovies.length !== 0">
        <b-list-group horizontal class="flex-sm-wrap">
          <b-list-group-item
            class="w-auto m-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle card"
            v-for="{
              title,
              backdrop_path,
              overview,
              original_title,
              release_date,
              vote_average,
              id,
            } in uniqueMovies"
            :key="id"
          >
            <film-card
              :title="title"
              :backdropPath="backdrop_path || ''"
              :overview="overview"
              :originalTitle="original_title"
              :releaseDate="release_date || ''"
              :overallRating="vote_average"
              :cardId="id"
              @get-movie-card-id="getChosenMovieDetails"
            >
            </film-card>
          </b-list-group-item>
        </b-list-group>
        <modal-window :genres="genres" />
      </div>
      <div v-else style="color: #fff">
        Unfortunately, your search returned no results...
      </div>
    </div>
    <div class="spinner" v-else>
      <b-spinner />
    </div>
    <div ref="observer" style="border: 1px solid #46a094"></div>
  </div>
</template>

<script>
import FilmCard from "@/components/Cards/FilmCard";
import ModalWindow from "@/components/UI/MovieModalWindow";

import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "FilmsList",
  components: { FilmCard, ModalWindow },
  data: () => ({
    totalResults: 0,
    currentPage: 1,
    genres: "",
  }),
  methods: {
    compareTotalResults() {
      if (this.movies.total_results > 10000) {
        this.totalResults = 10000;
      } else {
        this.totalResults = this.movies.total_results;
      }
    },
    async fetchFilms() {
      await this.getMovies();
      this.compareTotalResults();
    },
    async getChosenMovieDetails(card) {
      await this.getMovieDetails(card);
      const unFilteredGenres = this.movieDetails.genres.map((el) => el.name);
      this.genres =
        unFilteredGenres.length > 3
          ? unFilteredGenres.slice(0, 3).join(", ") + "..."
          : unFilteredGenres.join(", ");
    },
    ...mapActions(["getMovies", "getMovieDetails", "getNextMoviesPage"]),
  },
  created() {
    if (!this.searchQuery) {
      this.fetchFilms();
    }
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
          if (this.currentPage !== this.movies.page) {
            this.currentPage = 1;
          }
          this.currentPage += 1;
          await this.getNextMoviesPage({
            page: this.currentPage,
            query: this.selectedSearchQuery,
            genres: this.selectedGenres,
            chosenLeftRatingVote: this.leftRatingRangeValue,
            chosenRightRatingVote: this.rightRatingRangeValue,
            chosenLeftReleaseDateVote: this.leftYearRangeValue,
            chosenRightReleaseDateVote: this.rightYearRangeValue,
            selectedValue: this.selectedValue,
          });
          this.compareTotalResults();
        }
      }, {});
      observer.observe(this.$refs.observer);
    }, 1000);
  },
  computed: {
    ...mapGetters(["uniqueMovies"]),
    ...mapState([
      "movieDetails",
      "movies",
      "searchQuery",
      "isLoading",
      "selectedSearchQuery",
      "selectedGenres",
      "leftRatingRangeValue",
      "rightRatingRangeValue",
      "leftYearRangeValue",
      "rightYearRangeValue",
      "selectedValue",
    ]),
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
