<template>
  <div>
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
        <modal-window :genres="filteredGenres"/>
      </div>
      <div v-else style="color: #fff">
        Unfortunately, your search returned no results...
      </div>
    </div>
    <div class="spinner" v-else>
      <b-spinner/>
    </div>
    <div ref="observer"></div>
  </div>
</template>

<script>
import FilmCard from "@/components/Cards/FilmCard";
import ModalWindow from "@/components/Interactive/MovieModalWindow";

import {mapActions, mapGetters, mapState} from "vuex";
import {observerMixin} from "@/mixins/observerMixin";

export default {
  name: "FilmsList",
  components: {FilmCard, ModalWindow},
  data: () => ({
    totalResults: 0,
    currentPage: 1,
  }),
  mixins: [observerMixin('movies')],
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
    },
    ...mapActions(["getMovies", "getMovieDetails", "getNextMoviesPage"]),
  },
  created() {
    if (!this.searchQuery) {
      this.fetchFilms();
    }
  },
  computed: {
    filteredGenres() {
      const unFilteredGenres = this.movieDetails.genres ? this.movieDetails.genres.map((el) => el.name) : [];
      return unFilteredGenres.length > 3
          ? unFilteredGenres.slice(0, 3).join(", ") + "..."
          : unFilteredGenres.join(", ");
    },
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
